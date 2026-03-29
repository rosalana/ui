import { useDebounceFn } from "@vueuse/core";
import { reactive, ref, watch } from "vue";
import { useTableColumns, type ResolvedColumn } from "../useTableColumns";
import { TableErrors } from "../../helpers/table_errors";
import { tableDebug } from "../../helpers/tableDebug";
import type { RemoteTableConfig, RemoteTableState } from "./types";
export * from "./types";

export function useRemoteTable<T = any>(config: RemoteTableConfig<T>) {
  if (config.options?.debug !== undefined) {
    tableDebug.value = config.options.debug;
  }

  const columns = useTableColumns<T>(config.columns);

  /**
   * Shared loading ref — passed to all event handlers so they can show/hide
   * the loading skeleton by setting loading.value = true / false.
   */
  const loading = ref(false);

  /**
   * -------------------------------
   * Row identification
   * -------------------------------
   */
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

  function getRowId(row: T): string | number {
    const key = config.options?.key;
    if (!key) return hashRow(row);
    const val = key
      .split(".")
      .reduce((acc: any, part) => acc?.[part], row as any);
    return val ?? hashRow(row);
  }

  /**
   * -------------------------------
   * Table State
   * -------------------------------
   */
  const state = reactive<RemoteTableState>({
    sort: config.state?.sort ?? { id: null, order: "asc" },
    page: config.state?.page ?? 1,
    pageSize: config.state?.pageSize ?? 15,
    search: config.state?.search ?? "",
  });

  const shouldCatch = reactive({
    sort: true,
    page: true,
    pageSize: true,
    search: true,
  });

  /**
   * -------------------------------
   * Event Watchers
   * Each fires the corresponding on-handler with the shared loading ref.
   * -------------------------------
   */
  watch(state.sort, (newSort) => {
    if (shouldCatch.sort) config.on?.sort?.({ ...newSort }, loading);
    shouldCatch.sort = true;
  });

  watch(
    () => state.page,
    (newPage) => {
      if (shouldCatch.page) config.on?.page?.(newPage, loading);
      shouldCatch.page = true;
    },
  );

  watch(
    () => state.pageSize,
    (newPageSize) => {
      if (shouldCatch.pageSize) config.on?.pageSize?.(newPageSize, loading);
      shouldCatch.pageSize = true;
    },
  );

  watch(
    () => state.search,
    (newSearch) => {
      if (shouldCatch.search) config.on?.search?.(newSearch, loading);
      shouldCatch.search = true;
    },
  );

  /**
   * Debounced search — search input updates are throttled before hitting state.
   * Page is reset silently (shouldCatch.page = false) to avoid firing a separate page event.
   */
  const debounceSearch = useDebounceFn((value: string) => {
    if (
      value &&
      tableDebug.value &&
      !columns.all.some((col) => col.searchable)
    ) {
      console.warn(...TableErrors.column.noSearchable);
    }
    shouldCatch.page = false;
    state.page = 1;
    state.search = value;
  }, 500);

  const totalPages = () =>
    Math.max(1, Math.ceil(config.total / state.pageSize));

  return {
    /** Shared loading ref — set to true by event handlers to show skeleton. */
    loading,
    data: {
      get final() {
        return config.data;
      },
      get total() {
        return config.total;
      },
    },
    columns,
    state: {
      get sort() {
        return state.sort;
      },
      set sort(sort: RemoteTableState["sort"]) {
        shouldCatch.sort = false;
        state.sort.id = sort.id;
        state.sort.order = sort.order;
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
        return totalPages();
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
    get search() {
      return state.search;
    },
    set search(value: string) {
      debounceSearch(value);
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
    toggle(column: ResolvedColumn<T>) {
      columns.toggle(column);
      config.on?.toggle?.(column);
    },
    getRowId,
    getInstanceId: () => config.options?.id,
  };
}

export type RemoteTableInstance<T = any> = ReturnType<typeof useRemoteTable<T>>;
