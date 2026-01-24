import type { HTMLAttributes } from "vue";
import type { Column } from "../../../composables/useTable/types";

export interface DataTableProps<T = any> {
  /** Data array to display in the table */
  data: T[];
  /** Column definitions */
  columns: Column<T>[];
  /** Unique key for each row */
  rowKey?: string;
  /** Initial page number */
  page?: number;
  /** Initial page size */
  pageSize?: number;
  /** Available page size options */
  pageSizeOptions?: number[];
  /** Show search input */
  showSearch?: boolean;
  /** Show row selection checkboxes */
  selectable?: boolean;
  /** Show column visibility toggle */
  columnToggle?: boolean;
  /** Show data filters */
  showFilters?: boolean;
  /** Show pagination controls */
  paginate?: boolean;
  /** Enable debug mode */
  debug?: boolean;
  /** Custom class */
  class?: HTMLAttributes["class"];
}
