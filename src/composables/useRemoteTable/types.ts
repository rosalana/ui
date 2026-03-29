import type { Ref } from "vue";
import type { Column } from "../useTableColumns/types";
import type { TableState } from "../useTable/types";

export type RemoteTableState = {
  sort: TableState["sort"];
  search: TableState["search"];
  page: TableState["page"];
  pageSize: TableState["pageSize"];
};

export type RemoteTableEvents<T = any> = {
  sort: (sort: RemoteTableState["sort"], loading: Ref<boolean>) => void;
  search: (search: RemoteTableState["search"], loading: Ref<boolean>) => void;
  page: (page: RemoteTableState["page"], loading: Ref<boolean>) => void;
  pageSize: (
    pageSize: RemoteTableState["pageSize"],
    loading: Ref<boolean>,
  ) => void;
  toggle: (column: Column<T>) => void;
};

export type RemoteTableConfig<T = any> = {
  /** Current page data — changes after each server request */
  data: T[];
  /** Column definitions — identical format to useTable */
  columns: Column<T>[];
  /** Total number of records on the server — required for pagination */
  total: number;
  /** Initial state overrides */
  state?: Partial<RemoteTableState>;
  /** Event handlers — alternative to Vue emits for programmatic use */
  on?: Partial<RemoteTableEvents<T>>;
  /** Options */
  options?: {
    debug?: boolean;
    /** Row key field for unique identification */
    key?: string;
    /** Instance ID */
    id?: string;
  };
};
