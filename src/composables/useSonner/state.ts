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
  /** Called when the toast is closed by the user or by `dismiss()`. */
  onDismiss?: (toast: SonnerToast) => void;
  /** Called when the toast closes after its duration ran out. */
  onAutoClose?: (toast: SonnerToast) => void;
}

export interface SonnerMessage extends SonnerOptions {
  /** Main text of the toast. */
  title: string;
}

/** A message given either as a title or as a full message object. */
export type SonnerInput = string | SonnerMessage;

export function normalize(
  input: SonnerInput,
  options?: SonnerOptions,
): SonnerMessage {
  return typeof input === "string"
    ? { ...options, title: input }
    : { ...input, ...options };
}

export interface SonnerToast extends SonnerMessage {
  id: SonnerId;
  type: SonnerType;
  /** Bumped on every update so the toast restarts its timer. */
  version: number;
}

export type DockActionVariant =
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive";

export interface DockAction {
  /** Text of the action button. */
  label: string;
  /** Optional icon (Iconify name) in front of the label. */
  icon?: string;
  /** Button variant. Defaults to `outline`. */
  variant?: DockActionVariant;
  /**
   * Called when the action is clicked. The dock stays open, return a promise
   * to show a spinner on the button until it settles.
   */
  onClick?: () => unknown;
}

export interface DockMessage {
  /** Main text of the dock. */
  title: string;
  /** Secondary text under the title. */
  description?: string;
  /** Optional icon (Iconify name) in front of the title. */
  icon?: string;
  /** Buttons shown under the text. */
  actions?: DockAction[];
}

export interface SonnerDock extends DockMessage {
  id: SonnerId;
  type: "dock";
  version: number;
  /** Number of actions still running. */
  pending: number;
  /** Its condition is gone, it closes once the running actions settle. */
  closing: boolean;
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
  /** Newest dock last, they stack like toasts with the newest in front. */
  docks: SonnerDock[];
  config: SonnerConfig;
}

export const state = reactive<SonnerState>({
  toasts: [],
  docks: [],
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
  // A success shown while a dock action runs (e.g. a flash message after
  // the request) is the result of that action, the dock turns into it.
  if (type === "success" && message.id === undefined) {
    const dock = state.docks.find((d) => d.pending > 0);
    if (dock) return morphDock(dock, type, message);
  }

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

function findDock(id: SonnerId) {
  return state.docks.find((d) => d.id === id);
}

function removeDock(id: SonnerId) {
  const index = state.docks.findIndex((d) => d.id === id);
  if (index !== -1) state.docks.splice(index, 1);
}

/** Shows a new dock, or updates the dock with the given id if it is still open. */
export function showDock(id: SonnerId | null, message: DockMessage): SonnerId {
  const existing = id !== null ? findDock(id) : undefined;

  if (existing) {
    // Reset optional fields so the previous content doesn't leak.
    Object.assign(
      existing,
      { description: undefined, icon: undefined, actions: undefined },
      message,
      { closing: false },
    );
    return existing.id;
  }

  const dockId = `dock-${++counter}`;
  state.docks.push({
    ...message,
    id: dockId,
    type: "dock",
    version: 0,
    pending: 0,
    closing: false,
  });
  return dockId;
}

/** Closes the dock, or lets it close once its running actions settle. */
export function closeDock(id: SonnerId) {
  const dock = findDock(id);
  if (!dock) return;
  if (dock.pending > 0) dock.closing = true;
  else removeDock(id);
}

/** Turns the dock into a regular toast in place. */
function morphDock(
  dock: SonnerDock,
  type: SonnerType,
  message: SonnerMessage,
): SonnerId {
  removeDock(dock.id);
  // Same id keeps the same element, so the dock animates into the toast.
  state.toasts.unshift({
    ...message,
    id: dock.id,
    type,
    version: dock.version + 1,
  });
  return dock.id;
}

export async function runDockAction(dock: SonnerDock, action: DockAction) {
  dock.pending++;
  try {
    await action.onClick?.();
  } finally {
    // Let watchers reacting to the same change (e.g. a flash message from
    // the response) push their toast while the action still counts as running.
    await new Promise((resolve) => setTimeout(resolve));
    dock.pending--;
    if (dock.closing && dock.pending === 0) removeDock(dock.id);
  }
}
