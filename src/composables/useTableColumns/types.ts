export type Column<T = any> = {
  /** Key in your Data Object to bind column to */
  key: string;
  /** Header for the column */
  header: string | ((context: any) => any);
  /** Render your data in different format or as a component */
  render?: (row: T) => any;
  /** Enable the option to automatically sort by this column (default: true) */
  sortable?: boolean;
  /** Enable the option to automatically generate filters for this column (default: false) */
  filterable?: boolean;
  /** Enable the option to search in this column (default: true) */
  searchable?: boolean;
  /** Enable the option to toggle the column visibility (default: true) */
  toggleable?: boolean;
  /** Make the column hidden by default */
  hidden?: boolean;
  /** Override the default behavior of relevant columns */
  relevant?: boolean;
  /** Optional position-binding string for matching in layouts */
  bindTo?: string;
};

export type ResolvedColumn<T = any> = Column<T> & {
  /** Column ID, used for tracking column state */
  id: string;
  /** Determines the content of the column — render() result or raw value */
  content: (row: T) => any;
  /** The current raw value of the key in data */
  value: (row: T) => any;
  /** Flag for generated/virtual columns (e.g. row ID column) */
  generated: boolean;
  /** Flag for dynamically added columns */
  additional: boolean;
};
