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

export type Column<T = any> = {
  /** Key in your Data Object to bind column to. When data does not exist in this key the key will display */
  key: string;
  /** Header for the column */
  header: string | ((row: T) => any);
  /** Render your data in different format or as a component */
  render?: (row: T) => any;
  /** Enable the option to automaticly sort by this column (default: true) */
  sortable?: boolean;
  /** Enable the option to automaticly generate filters for this column. Dont use this when you render `Header` as a component (default: false) */
  filterable?: boolean;
  /** Enable the option to search in this column (default: true) */
  searchable?: boolean;
  /** Enable the option to toggle the column vissiblity (default: true) */
  toggleable?: boolean;
  /** Make the column hidden as default */
  hidden?: boolean;
  /** Override the default behavior of relevant columns */
  relevant?: boolean;
  /** Optional position-binding string for matching in layouts */
  bindTo?: string;
};

export type ResolvedColumn<T = any> = Column<T> & {
  /** Column ID, used for tracking column state */
  id: string;
  /** Determines the content of the column */
  content: (row: T) => any;
  /** The current value of the key in data */
  value: (row: T) => any;
  /** Flag for extended/generated columns */
  generated: boolean;
  /** Flag for additional columns */
  additional: boolean;
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
