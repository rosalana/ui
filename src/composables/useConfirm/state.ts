import { reactive } from "vue";

/**
 * Variant types for the confirm dialog
 *
 * - `confirm`: Standard confirmation dialog.
 * - `match`: Requires the user to type a specific word to confirm. (same as verify internal)
 * - `verify`: Requires the user to login again to confirm their identity.
 */
export type ConfirmVariant = "confirm" | "verify";

export interface ConfirmOptions {
  /** The title of the confirmation dialog. */
  title?: string;
  /** An optional description to provide more context about the confirmation. */
  description?: string;
  /** An optional icon to display in the confirm button */
  icon?: string;
  /** Custom text for the confirm button. Defaults to "Confirm". */
  confirm?: string;
  /** Custom text for the cancel button. Defaults to "Cancel". */
  cancel?: string;
  /** Whether the confirm action is destructive. If true, the confirm button will be styled accordingly. */
  danger?: boolean;
}

export interface MatchConfirmOptions extends ConfirmOptions {
  /** The word the user must type to confirm. */
  match: string;
  /** An optional placeholder for the input field when using the match variant. */
  placeholder?: string;
}

export interface VerifyConfirmOptions extends ConfirmOptions {
  /** A callback function that verifies the given input */
  callback: (input: string) => Promise<boolean>;
  /** An optional placeholder for the input field when using the match variant. */
  placeholder?: string;
}

interface ConfirmState {
  open: boolean;
  variant: ConfirmVariant | null;
  options: ConfirmOptions | VerifyConfirmOptions;
  resolve: ((value: boolean) => void) | null;
}

export const state = reactive<ConfirmState>({
  open: false,
  variant: null,
  options: {},
  resolve: null,
});

export function respond(value: boolean) {
  state.open = false;
  state.resolve?.(value);
  setTimeout(() => {
    state.variant = null;
    state.options = {};
    state.resolve = null;
  }, 300);
}
