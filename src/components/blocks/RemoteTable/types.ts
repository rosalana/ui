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
  /** Initial page */
  page?: number;
  /** Initial page size */
  size?: number;
  /** Initial search string */
  search?: string;
  /** Initial sort state */
  sort?: RemoteTableState["sort"];
  /** Loading ref */
  loading?: boolean;
}

export type RemoteTableEmits<T = any> = {
  "update:sort": [sort: RemoteTableState["sort"]];
  "update:search": [search: string];
  "update:page": [page: number];
  "update:size": [pageSize: number];
  toggle: [column: Column<T>];
  update: [];
};
