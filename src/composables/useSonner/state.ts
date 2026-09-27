import { reactive } from "vue";

/**
 * Visual type of a toast.
 *
 * - `default`: Neutral message without a state icon.
 * - `info` / `success` / `warning` / `error`: Colored state toasts.
 * - `loading`: Persistent toast with a spinner (used by `promise`).
 */
export type SonnerType =
  | "default"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "loading";

export type SonnerPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type SonnerId = string | number;

export interface SonnerAction {
  /** Text of the action button. */
  label: string;
  /** Called when the action is clicked. The toast is dismissed afterwards. */
  onClick?: (event: MouseEvent) => void;
}

export interface SonnerOptions {
  /** Custom id. Showing a toast with an existing id updates it in place. */
  id?: SonnerId;
  /** Secondary text under the title. */
  description?: string;
  /** Custom icon (Iconify name) replacing the type icon. */
  icon?: string;
  /** Time in ms before the toast closes. `Infinity` keeps it open. */
  duration?: number;
  /** Whether the user can close the toast (close button, swipe). Defaults to `true`. */
  dismissible?: boolean;
  /** Optional action button. */
  action?: SonnerAction;
  /** Called when the toast is closed by the user or by `dismiss()`. */
  onDismiss?: (toast: SonnerToast) => void;
  /** Called when the toast closes after its duration ran out. */
  onAutoClose?: (toast: SonnerToast) => void;
}

export interface SonnerMessage extends SonnerOptions {
  /** Main text of the toast. */
  title: string;
}

export interface SonnerToast extends SonnerMessage {
  id: SonnerId;
  type: SonnerType;
  /** Bumped on every update so the toast restarts its timer. */
  version: number;
}

export interface SonnerConfig {
  /** Where the toasts appear. Defaults to `bottom-right`. */
  position: SonnerPosition;
  /** Default duration in ms. Defaults to `4000`. */
  duration: number;
  /** Maximum number of toasts rendered at once. Defaults to `3`. */
  visible: number;
  /** Keep the stack expanded instead of collapsing it. Defaults to `false`. */
  expand: boolean;
}

interface SonnerState {
  /** Newest toast first. */
  toasts: SonnerToast[];
  config: SonnerConfig;
}

export const state = reactive<SonnerState>({
  toasts: [],
  config: {
    position: "bottom-right",
    duration: 4000,
    visible: 3,
    expand: false,
  },
});

let counter = 0;

export function configure(config: Partial<SonnerConfig>) {
  Object.assign(state.config, config);
}

export function push(
  type: SonnerType,
  message: SonnerMessage,
): SonnerId {
  const existing =
    message.id !== undefined
      ? state.toasts.find((t) => t.id === message.id)
      : undefined;

  if (existing) {
    // Replace the whole message so fields from the previous state don't leak.
    const { id, version } = existing;
    for (const key of Object.keys(existing)) {
      delete (existing as Record<string, unknown>)[key];
    }
    Object.assign(existing, message, { id, type, version: version + 1 });
    return id;
  }

  const id = message.id ?? `sonner-${++counter}`;
  state.toasts.unshift({ ...message, id, type, version: 0 });
  return id;
}

function remove(id: SonnerId): SonnerToast | undefined {
  const index = state.toasts.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  return state.toasts.splice(index, 1)[0];
}

export function dismiss(id?: SonnerId) {
  const ids = id === undefined ? state.toasts.map((t) => t.id) : [id];
  for (const toastId of ids) {
    const toast = remove(toastId);
    toast?.onDismiss?.(toast);
  }
}

export function autoClose(id: SonnerId) {
  const toast = remove(id);
  toast?.onAutoClose?.(toast);
}
