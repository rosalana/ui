import type { ComputedRef, InjectionKey } from "vue";

export interface CodeBlockGroupItem {
  value: string;
  label: string;
  /** Code to copy while the item is shown, none for a preview. */
  code?: () => string;
}

export interface CodeBlockGroupContext {
  /** The shown item: the chosen one, or the first registered. */
  current: ComputedRef<string | undefined>;
  items: ComputedRef<CodeBlockGroupItem[]>;
  register: (item: CodeBlockGroupItem) => () => void;
}

/** `null` inside a preview: what it shows is not part of the group around it. */
export const codeBlockGroupKey: InjectionKey<CodeBlockGroupContext | null> =
  Symbol("CodeBlockGroup");
