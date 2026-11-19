export interface Property {
  name: string;
  type: string;
  optional: boolean;
  description: string;
  default?: string;
}
export interface ComponentApi {
  name: string;
  group: string;
  kind: string;
  file: string;
  props: Property[];
  events: Property[];
  models: { name: string; type: string }[];
  slots: string[];
  slotProps: Property[];
  exposed: Property[];
  variants: Record<string, string[]>;
}
export interface ExportApi {
  name: string;
  kind: string;
  file: string;
  description: string;
  declaration: string;
  entry: string;
}
export interface DocSection {
  id: string;
  title: string;
  text?: string;
  code?: string;
  language?: string;
}
/** One runnable example: `workbench/examples/{page}/{file}.vue`, shown with its full source. */
export interface DocExample {
  /** File name without `.vue`. A `{file}.code.vue` next to it replaces the shown source. */
  file: string;
  title: string;
  description?: string;
  /** `center` (default) centers the example, `fill` stretches it, `flush` drops the padding. */
  preview?: "center" | "fill" | "flush";
  /** Let popovers and menus of the example reach outside its frame. */
  overflow?: boolean;
}
export interface DocExampleEntry extends DocExample {
  id: string;
}
export interface DocPage {
  id: string;
  title: string;
  group: string;
  description: string;
  kind: "guide" | "component" | "block" | "tool";
  sections: DocSection[];
  components?: ComponentApi[];
  symbols?: ExportApi[];
  examples?: DocExampleEntry[];
  integration?: boolean;
  status?: "done" | "untouched" | "unimplemented";
}
