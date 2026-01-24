import type { HTMLAttributes } from "vue"
import type { Column } from "../../../composables/useTable/types"

export interface DataTableProps<T = any> {
  /** Data array to display in the table */
  data: T[]
  /** Column definitions */
  columns: Column<T>[]
  /** Unique key in data objects for row identification */
  rowKey?: string
  /** Initial page number */
  page?: number
  /** Initial page size */
  pageSize?: number
  /** Available page size options */
  pageSizeOptions?: number[]
  /** Show search input */
  searchable?: boolean
  /** Search input placeholder */
  searchPlaceholder?: string
  /** Show row selection checkboxes */
  selectable?: boolean
  /** Show column visibility toggle */
  columnToggle?: boolean
  /** Show pagination controls */
  pagination?: boolean
  /** Empty state message */
  emptyMessage?: string
  /** Enable debug mode */
  debug?: boolean
  /** Custom class */
  class?: HTMLAttributes["class"]
}
