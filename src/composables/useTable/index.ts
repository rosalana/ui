import { useDebounceFn } from "@vueuse/core";
import { computed, defineComponent, reactive, ref, watch } from "vue";
import type { Column, ResolvedColumn, TableConfig, TableState } from "./types";

const debug = ref(true);
export function useTable<T = any>(config: TableConfig<T>) {
  const ROW_UNIQUE_ID = "_row_unique_id";

  function getValueByPath(obj: any, path: string): any {
    if (path === ROW_UNIQUE_ID) return getRowId(obj);
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  }

  if (config.options?.debug !== undefined) {
    debug.value = config.options.debug;
  }

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
   * -------------------------------
   * Helper States
   * -------------------------------
   */
  const rowKeyValid = ref<boolean | null>(null);
  const columns = ref<ResolvedColumn<T>[]>([]);

  /** Resolve columns from config */
  columns.value = config.columns.map((column, index) =>
    reactive({
      id: hashColumn(column),
      sortable: true,
      searchable: true,
      filterable: false,
      toggleable: true,
      hidden: false,
      relevant: !!(!column.hidden || column.relevant),
      generated: column.key === ROW_UNIQUE_ID,
      additional: false,
      value: (row: T) => getValueByPath(row, column.key),
      content: (row: T) =>
        column.render && column.render(row) ? column.render(row) : getValueByPath(row, column.key),
      ...column,
    })
  );

  const originalData = computed(() =>
    config.data.map((row) => ({
      ...row,
      [ROW_UNIQUE_ID]: getRowId(row),
    }))
  );

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
    }
  );

  watch(
    () => state.pageSize,
    (newPageSize) => {
      if (config.on?.pageSize && shouldCatch.pageSize) config.on.pageSize(newPageSize);
      shouldCatch.pageSize = true;
    }
  );

  watch(
    () => state.filter,
    (newFilter) => {
      if (config.on?.filter && shouldCatch.filter) config.on.filter(newFilter);
      shouldCatch.filter = true;
    }
  );

  watch(
    () => state.search,
    (newSearch) => {
      if (config.on?.search && shouldCatch.search) config.on.search(newSearch);
      shouldCatch.search = true;
    }
  );

  watch(state.select, (newSelect) => {
    if (config.on?.select && shouldCatch.select) {
      config.on.select(
        Array.from(newSelect).map((id) =>
          originalData.value.find((row) => row[ROW_UNIQUE_ID] === id)
        )
      );
    }
    shouldCatch.search = true;
  });
  /**
   * -------------------------------
   * Helper Functions
   * -------------------------------
   */

  // Debounce function to limit search calls
  const debounceSearch = useDebounceFn((searchTerm) => {
    state.search = searchTerm;
  }, 500);

  // generate a hash from the row object
  function hashRow(row: T): string {
    const str = JSON.stringify(row);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `table-row-${Math.abs(hash)}`;
  }

  function hashColumn(column: Column): string {
    const str = JSON.stringify(column);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32bit integer
    }
    return `table-column-${Math.abs(hash)}`;
  }

  // get the row id
  const getRowId = (row: T): string | number => {
    const key = config.options?.key;

    if (rowKeyValid.value === null) {
      if (!key) {
        console.warn(...TableErrors.row.notDefinedKey);
        rowKeyValid.value = false;
        return hashRow(row);
      }
      const result = getValueByPath(row, key);
      const isUnique =
        config.data.filter((row) => getValueByPath(row, key) === result).length === 1;

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
      // Vše OK
      rowKeyValid.value = true;
      return result;
    } else if (rowKeyValid.value === true) {
      return getValueByPath(row, key as string);
    } else {
      return hashRow(row);
    }
  };

  // build-in search function
  const searchToFilterFn = (row: T) => {
    if (!state.search) return true;
    const search = state.search.toLowerCase();
    const relevantColumns = columns.value.filter((col) => col.relevant);

    // If no columns at all are searchable, return all rows (no filtering)
    if (!columns.value.some((col) => col.searchable)) {
      if (debug.value) {
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

    const col = columns.value.find((c) => c.id === id);
    if (!col || !col.sortable) return [...originalData.value];

    const direction = order === "asc" ? 1 : -1;

    return [...originalData.value].sort((a, b) => {
      const aVal = col.value(a);
      const bVal = col.value(b);

      // Null / undefined
      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1 * direction;
      if (bVal == null) return -1 * direction;

      // Array
      //   if (Array.isArray(aVal) && Array.isArray(bVal)) {
      //     for (let i = 0; i < Math.min(aVal.length, bVal.length); i++) {
      //       if (aVal[i] < bVal[i]) return -1 * direction;
      //       if (aVal[i] > bVal[i]) return 1 * direction;
      //     }
      //     return (aVal.length - bVal.length) * direction;
      //   }
      if (Array.isArray(aVal) && Array.isArray(bVal)) {
        const aEmpty = aVal.length === 0;
        const bEmpty = bVal.length === 0;

        // posuň prázdné pole dolů
        if (aEmpty && !bEmpty) return 1 * direction;
        if (!aEmpty && bEmpty) return -1 * direction;
        if (aEmpty && bEmpty) return 0;

        // porovnej jednotlivé hodnoty
        for (let i = 0; i < Math.min(aVal.length, bVal.length); i++) {
          if (aVal[i] < bVal[i]) return -1 * direction;
          if (aVal[i] > bVal[i]) return 1 * direction;
        }

        // jinak podle délky (např. [a,b] < [a,b,c])
        return (aVal.length - bVal.length) * direction;
      }

      // Normal compare
      if (aVal < bVal) return -1 * direction;
      if (aVal > bVal) return 1 * direction;
      return 0;
    });
  });

  const filteredData = computed(() => {
    return sortedData.value.filter((row) => state.filter(row) && searchToFilterFn(row));
  });

  const paginatedData = computed(() => {
    const totalPages = Math.ceil(filteredData.value.length / state.pageSize);
    if (state.page > totalPages) {
      state.page = 1;
    }
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
          originalData.value.find((row) => row[ROW_UNIQUE_ID] === id)
        );
      },
    },
    columns: {
      get all() {
        return columns.value;
      },
      add(column: Column & { index?: number }) {
        const resolved = reactive<ResolvedColumn>({
          id: hashColumn(column),
          sortable: true,
          searchable: true,
          filterable: false,
          toggleable: true,
          hidden: false,
          relevant: !!(!column.hidden || column.relevant),
          generated: false,
          additional: true,
          value: (row: T) => getValueByPath(row, column.key),
          content: (row: T) =>
            column.render && column.render(row)
              ? column.render(row)
              : getValueByPath(row, column.key),
          ...column,
        })
        if (column.index !== undefined && column.index >= 0 && column.index < columns.value.length) {
          columns.value.splice(column.index, 0, resolved);
        } else {
          columns.value.push(resolved);
        }
        return resolved;
      },
      remove(column: ResolvedColumn) {
        const index = columns.value.findIndex((col) => col.id === column.id);
        if (index !== -1) {
          columns.value.splice(index, 1);
        }
      },
      get visible() {
        return this.all.filter((col) => col.hidden !== true);
        // return columns.value.filter((col) => !col.hidden);
      },
      get hidden() {
        return this.all.filter((col) => col.hidden === true);
      },
      get relevant() {
        return this.all.filter((col) => col.relevant === true || col.filterable === true || col.key === 'id');
      },
      get toggleable() {
        return this.all.filter((col) => col.toggleable === true);
      },
      get filterable() {
        return this.all.filter((col) => col.filterable === true);
      },
      binded(key: string): ResolvedColumn | undefined {
        return this.visible.find((col) => col.bindTo === key);
      },
      unbinded() {
        return this.visible.filter((col) => !col.bindTo);
      },
      getByKey(key: string): ResolvedColumn | undefined {
        return columns.value.find((col) => col.key === key);
      },
      uniqueOf(column?: ResolvedColumn<T>): any[] {
        if (!column) return [];
        const rawValues = originalData.value.map((row) => column.value(row));

        const flat = rawValues.flatMap((value) => {
          if (Array.isArray(value)) {
            return value.filter((v) => v !== null && v !== undefined && v !== "");
          } else if (value !== null && value !== undefined && value !== "") {
            return [value];
          }
          return [];
        });

        return Array.from(new Set(flat)).sort(); // unikátní a seřazené
      },
      valuesOf(column: ResolvedColumn<T>): any[] {
        return originalData.value.map((row) => column.value(row));
      },
    },
    select: {
      isIndeterminate() {
        return state.select.size > 0 && state.select.size < originalData.value.length;
      },
      isAllSelected() {
        return state.select.size === filteredData.value.length;
      },
      isAllOnPage() {
        return paginatedData.value.every((row: any) => state.select.has(row[ROW_UNIQUE_ID]));
      },
      isSelected(row: any) {
        return state.select.has(row[ROW_UNIQUE_ID]);
      },
      toggleAll() {
        if (!this.isAllSelected()) {
          if (this.isIndeterminate()) {
            if (this.isAllOnPage()) {
              paginatedData.value.forEach((row: any) => state.select.delete(row[ROW_UNIQUE_ID]));
            } else {
              paginatedData.value.forEach((row: any) => state.select.add(row[ROW_UNIQUE_ID]));
            }
          } else {
            state.select.clear();
            paginatedData.value.forEach((row: any) => state.select.add(row[ROW_UNIQUE_ID]));
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

        if (this.current > this.total) {
          this.current = this.total;
        }
      },
      next() {
        if (!this.last) {
          this.current++;
        }
      },
      prev() {
        if (!this.first) {
          this.current--;
        }
      },
    },
    operation: {
      sum: (column: ResolvedColumn<T>) => {
        const values = originalData.value.map((row) => column.value(row));
        const flat = values.flatMap((value) => {
          if (Array.isArray(value)) {
            return value.filter((v) => v !== null && v !== undefined && v !== "");
          } else if (value !== null && value !== undefined && value !== "") {
            return [value];
          }
          return [];
        });
        return flat.reduce((acc, val) => {
          if (typeof val === "number") {
            return acc + val;
          }
          return acc;
        }, 0);
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
    toggle(column: ResolvedColumn) {
      if (column.toggleable) {
        column.hidden = !column.hidden;
        if (config.on?.toggle) {
          config.on.toggle(column);
        }
      }
    },
    sort(column: ResolvedColumn) {
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
    getInstanceId: () => {
      return config.options?.id;
    },
    getRowId
  };
}

export const HeaderRender = defineComponent({
  props: ["column", "context"],
  setup(props: { column: ResolvedColumn; context: any }) {
    return () => {
      if (!props.column) {
        if (debug.value) {
          console.warn("[HeaderRender] No column provided");
        }
        return;
      }

      let result;
      if (typeof props.column?.header === "function") {
        result = props.column.header(props.context);
      } else {
        result = props.column.header;
      }

      if (!result) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.null,
            `${props.column.key} header`,
            result
          );
        }
        return String(result);
      }

      return result;
    };
  },
});

export const ColumnRender = defineComponent({
  props: ["column", "context"],
  setup(props: { column: ResolvedColumn; context: any }) {
    return () => {
      if (!props.column) {
        if (debug.value) {
          console.warn("[ColumnRender] No column provided");
        }
        return;
      }

      const value = props.column?.value(props.context);
      const content = props.column?.content(props.context);

      if (!content) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.null,
            `${props.column.key} reading`,
            value,
            props.context
          );
        }
        return String(value);
      }

      if (typeof value === "object" && value === content) {
        if (debug.value) {
          console.warn(
            ...TableErrors.render.invalidType.object,
            `${props.column.key} reading`,
            value,
            props.context
          );
        }
        return String(value);
      }

      return content;
    };
  },
});

const TableErrors = {
  column: {
    noSearchable: [
      "%c[Table Warning]: No searchable columns are defined.\n\n" +
        "%cFallback: All rows will be displayed without filtering.",
      "font-weight: bold; color: orange;",
      "",
    ],
  },
  row: {
    invalidTypeKey: [
      "%c[Table Warning]: The provided key in Config.Options.Key is not a string or number.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
    notUniqueKey: [
      "%c[Table Warning]: The provided key in Config.Options.Key is not unique.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
    notDefinedKey: [
      "%c[Table Warning]: Config.Options.Key is not defined.\n\n" +
        "%cFallback: Using a hashed row identifier instead.",
      "font-weight: bold; color: orange;",
      "",
    ],
  },
  render: {
    invalidType: {
      object: [
        "%c[Table Warning]: Attempted to render an object as a string.\n\n" +
          "%cRendering objects directly is not supported. Use the render() function to define custom rendering logic.\n\n" +
          "%cNote: Rendering is separate from data representation.\n\n" +
          "%cTip: %cConsider using the render() function to handle object rendering.\n\n Details:",
        "font-weight: bold; color: orange;",
        "",
        "font-style: italic;",
        "font-weight: bold; color: black;",
        "",
      ],
      null: [
        "%c[Table Warning]: Attempted to render a null or undefined value as a string.\n\n" +
          "%cNullable values in your data should be handled explicitly for better user experience.\n\n" +
          "%cNote: Rendering is separate from data representation.\n\n" +
          "%cTip: %cConsider handling null or undefined values in your render logic.\n\n Details:",
        "font-weight: bold; color: orange;",
        "",
        "font-style: italic;",
        "font-weight: bold; color: black;",
        "",
      ],
    },
  },
};
