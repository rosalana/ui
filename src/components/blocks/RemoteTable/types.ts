import type { HTMLAttributes, Ref } from "vue";
import type { Column } from "../../../composables";
import type { RemoteTableState } from "../../../composables";
import type { ActionItem } from "../Actions/types";

export interface RemoteTableProps<T = any> {
  /** Current page rows from the server */
  data: T[];
  /** Total number of records across all pages */
  total: number;
  /** Column definitions — identical format to DataTable */
  columns: Column<T>[];
  /** Row key field for unique identification */
  rowKey?: string;
  /** Initial page */
  page?: number;
  /** Initial page size */
  pageSize?: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Show search input */
  showSearch?: boolean;
  /** Show column visibility toggle */
  columnToggle?: boolean;
  /** Show pagination controls */
  paginate?: boolean;
  /** Header actions */
  headerActions?: ActionItem[] | ((loading: Ref<boolean>) => ActionItem[]);
  /** Row actions */
  rowActions?: ActionItem[] | ((row: T) => ActionItem[]);
  /** Custom class */
  class?: HTMLAttributes["class"];
}

export type RemoteTableEmits<T = any> = {
  sort: [sort: RemoteTableState["sort"], loading: Ref<boolean>];
  search: [search: string, loading: Ref<boolean>];
  page: [page: number, loading: Ref<boolean>];
  pageSize: [pageSize: number, loading: Ref<boolean>];
  toggle: [column: Column<T>];
};
