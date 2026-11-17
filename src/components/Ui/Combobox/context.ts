import type { AcceptableValue } from "reka-ui";
import type { ComputedRef, InjectionKey, Ref } from "vue";

/**
 * One option of a combobox. Extra keys are welcome (an `email`, an `avatar`…) and come back
 * typed in the `item` slot, for a custom look.
 */
export interface ComboboxItem {
  value: AcceptableValue;
  /** What the option shows, what the filter matches and what the input shows once it's picked. */
  label: string;
  /** An Iconify icon in front of the label, like `lucide:user`. */
  icon?: string;
  /** A short hint at the end of the option, like a code or a key, see `UiComboboxShortcut`. */
  shortcut?: string;
  disabled?: boolean;
  /** More words the filter matches besides the label, like a code or a synonym. */
  keywords?: string[];
}

/** A section of options under a heading. Groups are split by a separator. */
export interface ComboboxGroup<T extends ComboboxItem = ComboboxItem> {
  heading?: string;
  items: T[];
}

/** The `items` of a combobox: options, groups of options, or both. */
export type ComboboxItems<T extends ComboboxItem = ComboboxItem> = (T | ComboboxGroup<T>)[];

/**
 * How the combobox filters its options on the client.
 * - `"contains"` (default): the label or a keyword contains the search anywhere.
 * - `"startsWith"`: the label or a keyword starts with the search.
 * - A function gets an option's text (its label, then each keyword) and the trimmed search and
 *   says whether it matches.
 *
 * Both built-in ones compare in the app locale, ignoring case and accents (`"cesky"` finds `"Česky"`).
 */
export type ComboboxFilter =
  | "contains"
  | "startsWith"
  | ((text: string, search: string) => boolean);

/** Fetches the results for a search. The combobox debounces it and aborts the previous one. */
export type ComboboxSearch = (search: string, signal: AbortSignal) => unknown;

export function isComboboxGroup<T extends ComboboxItem>(
  entry: T | ComboboxGroup<T>,
): entry is ComboboxGroup<T> {
  return Array.isArray((entry as ComboboxGroup<T>).items);
}

export interface ComboboxContext {
  /**
   * What the user searches for while the list is open. reka-ui clears its search the moment the
   * list starts closing, which would flash every option in during the exit animation.
   */
  search: Ref<string>;
  /** A search is waiting for the debounce or running, or the app says it loads. */
  loading: ComputedRef<boolean>;
  /** Called by the input whenever the user types into the open list. */
  setSearch: (search: string) => void;
  /** Identity of a value, by `by` when it's a key name, for matching values across fresh copies. */
  keyOf: (value: unknown) => PropertyKey;
  /** The label of a value from `items`, `undefined` when no option has it. */
  labelOf: (value: unknown) => string | undefined;
  /** Every option of `items`, flat. */
  options: ComputedRef<ComboboxItem[]>;
}

export const COMBOBOX_CONTEXT: InjectionKey<ComboboxContext> = Symbol("UiCombobox");
