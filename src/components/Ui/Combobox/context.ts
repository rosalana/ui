import type { ComputedRef, InjectionKey, Ref } from "vue";

/**
 * How the combobox filters its items on the client.
 * - `"contains"` (default): the text contains the search anywhere.
 * - `"startsWith"`: the text starts with the search.
 * - A function gets the item's text and the trimmed search and says whether the item stays.
 *
 * Both built-in ones compare in the app locale, ignoring case and accents (`"cesky"` finds `"Česky"`).
 */
export type ComboboxFilter =
  | "contains"
  | "startsWith"
  | ((text: string, search: string) => boolean);

/** Fetches the results for a search. The combobox debounces it and aborts the previous one. */
export type ComboboxSearch = (search: string, signal: AbortSignal) => unknown;

export interface ComboboxContext {
  /**
   * What the user searches for while the list is open. reka-ui clears its search the moment the
   * list starts closing, which would flash every item in during the exit animation.
   */
  search: Ref<string>;
  /** Whether an item with this text stays for the search. `null` when the server filters. */
  matches: ComputedRef<((text: string, search: string) => boolean) | null>;
  /** A search is waiting for the debounce or running, or the app says it loads. */
  loading: ComputedRef<boolean>;
  /** Called by the input whenever the user types into the open list. */
  setSearch: (search: string) => void;
  /** Items remember their text, so the input can show the label of the picked value, not the value. */
  rememberLabel: (value: unknown, label: string) => void;
  labelOf: (value: unknown) => string | undefined;
}

export const COMBOBOX_CONTEXT: InjectionKey<ComboboxContext> = Symbol("UiCombobox");

/** Visibility of each item of a group, by item id. A group with none visible hides itself. */
export const COMBOBOX_GROUP_CONTEXT: InjectionKey<Map<string, boolean>> = Symbol("UiComboboxGroup");
