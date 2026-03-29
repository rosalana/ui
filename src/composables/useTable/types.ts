import { useTable } from ".";
import { Column } from "../useTableColumns/types";

export type TableConfig<T = any> = {
  /** Data to display */
  data: T[];
  /** Columns definition */
  columns: Column<T>[];
  /** Current state of Table */
  state?: Omit<Partial<TableState<T>>, "search" | "select">;
  /** Events fired on state change */
  on?: Partial<TableEvents<T>>;
  /** Additional options */
  options?: {
    debug?: boolean;
    /** Row key to bind to. This is used for tracking row state */
    key?: string;
    /** id of the instance */
    id?: string;
  };
};

export type TableState<T = any> = {
  /** Current sort state */
  sort: { id: string | null; order: "asc" | "desc" };
  /** Current filter function */
  filter: (row: T) => boolean;
  /** Current search string */
  search: string;
  /** Current page number */
  page: number;
  /** Number of items per page */
  pageSize: number;
  /** Current selected rows */
  select: Set<T>;
};

export type TableEvents<T = any> = {
  sort: (sort: TableState<T>["sort"]) => void;
  page: (page: TableState<T>["page"]) => void;
  pageSize: (pageSize: TableState<T>["pageSize"]) => void;
  filter: (filter: TableState<T>["filter"]) => void;
  search: (search: TableState<T>["search"]) => void;
  toggle: (column: Column<T>) => void;
  select: (row: any) => void;
};

export type TableInstance<T = any> = ReturnType<typeof useTable<T>>;
