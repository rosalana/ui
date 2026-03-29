import { useDebounceFn } from "@vueuse/core";
import { computed, reactive, ref, watch } from "vue";
import { useTableColumns, type ResolvedColumn } from "../useTableColumns";
import { TableErrors } from "../../helpers/table_errors";
import { tableDebug } from "../../helpers/tableDebug";
import type { TableConfig, TableState } from "./types";
export * from "./types";

export function useTable<T = any>(config: TableConfig<T>) {
  const ROW_UNIQUE_ID = "_row_unique_id";

  if (config.options?.debug !== undefined) {
    tableDebug.value = config.options.debug;
  }

  // Inject internal row-ID column as first column
  config.columns.unshift({
    key: ROW_UNIQUE_ID,
    header: "_ID",
    sortable: false,
    searchable: false,
    filterable: false,
    toggleable: false,
    hidden: true,
    relevant: true,
  });

  /**
   * Dot-notation value accessor with ROW_UNIQUE_ID support.
   * Used externally via table.getValueByPath().
   */
  function getValueByPath(obj: any, path: string): any {
    if (path === ROW_UNIQUE_ID) return getRowId(obj);
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  }

  /**
   * -------------------------------
   * Row identification
   * -------------------------------
   */
  const rowKeyValid = ref<boolean | null>(null);

  function hashRow(row: T): string {
    const str = JSON.stringify(row);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return `table-row-${Math.abs(hash)}`;
  }

  const getRowId = (row: T): string | number => {
    const key = config.options?.key;
    const path = key ?? "";

    if (rowKeyValid.value === null) {
      if (!key) {
        console.warn(...TableErrors.row.notDefinedKey);
        rowKeyValid.value = false;
        return hashRow(row);
      }
      const result = path
        .split(".")
        .reduce((acc: any, part) => acc?.[part], row);
      const isUnique =
        config.data.filter(
          (r) =>
            path.split(".").reduce((acc: any, part) => acc?.[part], r) ===
            result,
        ).length === 1;

      if (
        result === undefined ||
        result === null ||
        (typeof result !== "string" && typeof result !== "number")
      ) {
        console.warn(...TableErrors.row.invalidTypeKey);
        rowKeyValid.value = false;
        return hashRow(row);
      }

      if (!isUnique) {
        console.warn(...TableErrors.row.notUniqueKey);
        rowKeyValid.value = false;
        return hashRow(row);
      }

      rowKeyValid.value = true;
      return result;
    } else if (rowKeyValid.value === true) {
      return path.split(".").reduce((acc: any, part) => acc?.[part], row);
    } else {
      return hashRow(row);
    }
  };

  /**
   * -------------------------------
   * Data augmentation
   * -------------------------------
   */
  const originalData = computed(() =>
    config.data.map((row) => ({
      ...row,
      [ROW_UNIQUE_ID]: getRowId(row),
    })),
  );

  const columns = useTableColumns<T>(config.columns);

  // Mark the injected column as generated
  const generatedCol = columns.getByKey(ROW_UNIQUE_ID);
  if (generatedCol) generatedCol.generated = true;

  /**
   * -------------------------------
   * Table State
   * -------------------------------
   */
  const state = reactive<TableState<T>>({
    sort: config.state?.sort ?? { id: null, order: "desc" },
    filter: config.state?.filter ?? (() => true),
    page: config.state?.page ?? 1,
    pageSize: config.state?.pageSize ?? 10,
    select: new Set(),
    search: "",
  });

  const shouldCatch = reactive<Record<keyof TableState, boolean>>({
    sort: true,
    filter: true,
    page: true,
    pageSize: true,
    select: true,
    search: true,
  });

  /**
   * -------------------------------
   * Event Watchers
   * -------------------------------
   */
  watch(state.sort, (newSort) => {
    if (config.on?.sort && shouldCatch.sort) config.on.sort(newSort);
    shouldCatch.sort = true;
  });

  watch(
    () => state.page,
    (newPage) => {
      if (config.on?.page && shouldCatch.page) config.on.page(newPage);
      shouldCatch.page = true;
    },
  );

  watch(
    () => state.pageSize,
    (newPageSize) => {
      if (config.on?.pageSize && shouldCatch.pageSize)
        config.on.pageSize(newPageSize);
      shouldCatch.pageSize = true;
    },
  );

  watch(
    () => state.filter,
    (newFilter) => {
      if (config.on?.filter && shouldCatch.filter) config.on.filter(newFilter);
      shouldCatch.filter = true;
    },
  );

  watch(
    () => state.search,
    (newSearch) => {
      if (config.on?.search && shouldCatch.search) config.on.search(newSearch);
      shouldCatch.search = true;
    },
  );

  watch(state.select, (newSelect) => {
    if (config.on?.select && shouldCatch.select) {
      config.on.select(
        Array.from(newSelect).map((id) =>
          originalData.value.find((row) => row[ROW_UNIQUE_ID] === id),
        ),
      );
    }
    shouldCatch.select = true;
  });

  /**
   * -------------------------------
   * Helper Functions
   * -------------------------------
   */
  const debounceSearch = useDebounceFn((searchTerm) => {
    state.search = searchTerm;
  }, 500);

  const searchToFilterFn = (row: T) => {
    if (!state.search) return true;
    const search = state.search.toLowerCase();
    const relevantColumns = columns.relevant;

    if (!columns.all.some((col) => col.searchable)) {
      if (tableDebug.value) {
        console.warn(...TableErrors.column.noSearchable);
      }
      return true;
    }

    return relevantColumns.some((col) => {
      if (!col.searchable) return false;
      let value = col.value(row);
      if (typeof value === "number") value = value.toString();
      if (typeof value === "string") {
        return value.toLowerCase().includes(search);
      } else if (Array.isArray(value)) {
        return value.some((v) => v.toString().toLowerCase().includes(search));
      }
      return false;
    });
  };

  /**
   * -------------------------------
   * Data processing
   * -------------------------------
   */
  const sortedData = computed(() => {
    const { id, order } = state.sort;
    if (!id) return [...originalData.value];

    const col = columns.all.find((c) => c.id === id);
    if (!col || !col.sortable) return [...originalData.value];

    const direction = order === "asc" ? 1 : -1;

    return [...originalData.value].sort((a, b) => {
      const aVal = col.value(a);
      const bVal = col.value(b);

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1 * direction;
      if (bVal == null) return -1 * direction;

      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        const aEmpty = aVal.length === 0;
        const bEmpty = bVal.length === 0;
        if (aEmpty && !bEmpty) return 1 * direction;
        if (!aEmpty && bEmpty) return -1 * direction;
        if (aEmpty && bEmpty) return 0;
        for (let i = 0; i < Math.min(aVal.length, bVal.length); i++) {
          if (aVal[i] < bVal[i]) return -1 * direction;
          if (aVal[i] > bVal[i]) return 1 * direction;
        }
        return (aVal.length - bVal.length) * direction;
      }

      if (aVal < bVal) return -1 * direction;
      if (aVal > bVal) return 1 * direction;
      return 0;
    });
  });

  const filteredData = computed(() =>
    sortedData.value.filter(
      (row) => state.filter(row) && searchToFilterFn(row),
    ),
  );

  const paginatedData = computed(() => {
    const totalPages = Math.ceil(filteredData.value.length / state.pageSize);
    if (state.page > totalPages) state.page = 1;
    const start = (state.page - 1) * state.pageSize;
    return filteredData.value.slice(start, start + state.pageSize);
  });

  return {
    data: {
      get original() {
        return config.data;
      },
      get paginated() {
        return paginatedData.value;
      },
      get sorted() {
        return sortedData.value;
      },
      get filtered() {
        return filteredData.value;
      },
      get final() {
        return paginatedData.value;
      },
      get selected() {
        return Array.from(state.select).map((id) =>
          originalData.value.find((row) => row[ROW_UNIQUE_ID] === id),
        );
      },
    },
    columns,
    select: {
      isIndeterminate() {
        return (
          state.select.size > 0 && state.select.size < originalData.value.length
        );
      },
      isAllSelected() {
        return state.select.size === filteredData.value.length;
      },
      isAllOnPage() {
        return paginatedData.value.every((row: any) =>
          state.select.has(row[ROW_UNIQUE_ID]),
        );
      },
      isSelected(row: any) {
        return state.select.has(row[ROW_UNIQUE_ID]);
      },
      toggleAll() {
        if (!this.isAllSelected()) {
          if (this.isIndeterminate()) {
            if (this.isAllOnPage()) {
              paginatedData.value.forEach((row: any) =>
                state.select.delete(row[ROW_UNIQUE_ID]),
              );
            } else {
              paginatedData.value.forEach((row: any) =>
                state.select.add(row[ROW_UNIQUE_ID]),
              );
            }
          } else {
            state.select.clear();
            paginatedData.value.forEach((row: any) =>
              state.select.add(row[ROW_UNIQUE_ID]),
            );
          }
        } else {
          state.select.clear();
        }
      },
      toggle(row: any) {
        if (state.select.has(row[ROW_UNIQUE_ID])) {
          state.select.delete(row[ROW_UNIQUE_ID]);
        } else {
          state.select.add(row[ROW_UNIQUE_ID]);
        }
      },
    },
    state: {
      get sort() {
        return state.sort;
      },
      set sort(sort: TableState["sort"]) {
        shouldCatch.sort = false;
        state.sort.id = sort.id;
        state.sort.order = sort.order;
      },
      get filter() {
        return state.filter;
      },
      get select() {
        return state.select;
      },
      get page() {
        return state.page;
      },
      get pageSize() {
        return state.pageSize;
      },
      get search() {
        return state.search;
      },
    },
    paginator: {
      get total() {
        return Math.ceil(filteredData.value.length / state.pageSize);
      },
      get first() {
        return state.page === 1 || this.total === 0;
      },
      get last() {
        return state.page === this.total || this.total === 0;
      },
      get current() {
        return state.page;
      },
      set current(page: number) {
        if (page < 1 || page > this.total) return;
        state.page = page;
      },
      get size(): string {
        return state.pageSize.toString();
      },
      set size(size: string) {
        if (Number(size) < 1) return;
        state.pageSize = Number(size);
        if (this.current > this.total) this.current = this.total;
      },
      next() {
        if (!this.last) this.current++;
      },
      prev() {
        if (!this.first) this.current--;
      },
    },
    operation: {
      sum: (column: ResolvedColumn<T>) => {
        const values = originalData.value.map((row: T) => column.value(row));
        const flat = values.flatMap((value: any) => {
          if (Array.isArray(value)) {
            return value.filter(
              (v: any) => v !== null && v !== undefined && v !== "",
            );
          } else if (value !== null && value !== undefined && value !== "") {
            return [value];
          }
          return [];
        });
        return flat.reduce(
          (acc: number, val: any) =>
            typeof val === "number" ? acc + val : acc,
          0,
        );
      },
      uniqueOf(column?: ResolvedColumn<T>): any[] {
        if (!column) return [];
        const rawValues = originalData.value.map((row: T) => column.value(row));
        const flat = rawValues.flatMap((value: any) => {
          if (Array.isArray(value)) {
            return value.filter(
              (v: any) => v !== null && v !== undefined && v !== "",
            );
          } else if (value !== null && value !== undefined && value !== "") {
            return [value];
          }
          return [];
        });
        return Array.from(new Set(flat)).sort();
      },
      valuesOf(column: ResolvedColumn<T>): any[] {
        return originalData.value.map((row: T) => column.value(row));
      },
    },
    filter(filter: (row: T) => boolean) {
      state.filter = filter;
    },
    get search() {
      return state.search;
    },
    set search(search: string) {
      if (this.data.original.length > 2000) {
        debounceSearch(search);
      } else {
        state.search = search;
      }
    },
    /**
     * Toggles column visibility and fires the on.toggle event.
     * Use table.columns.toggle() if you only want to flip without the event.
     */
    toggle(column: ResolvedColumn<T>) {
      columns.toggle(column);
      if (config.on?.toggle) {
        config.on.toggle(column);
      }
    },
    sort(column: ResolvedColumn<T>) {
      if (column.sortable) {
        if (state.sort.id === column.id) {
          if (state.sort.order === "asc") {
            state.sort.order = "desc";
          } else {
            state.sort.id = null;
            state.sort.order = "asc";
          }
        } else {
          state.sort.id = column.id;
          state.sort.order = "asc";
        }
      }
    },
    getValueByPath,
    getInstanceId: () => config.options?.id,
    getRowId,
  };
}
