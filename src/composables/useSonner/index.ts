import { accessGlobal } from "../../plugin/virtual";
import { configure, dismiss, push } from "./state";
import type {
  SonnerId,
  SonnerMessage,
  SonnerOptions,
  SonnerType,
} from "./state";
import Sonner from "../../components/Ui/Sonner/Sonner.vue";

export type {
  SonnerAction,
  SonnerConfig,
  SonnerId,
  SonnerMessage,
  SonnerOptions,
  SonnerPosition,
  SonnerToast,
  SonnerType,
} from "./state";

// Auto-register the toaster into the virtual layer once.
accessGlobal(Sonner);

/** A message given either as a title or as a full message object. */
export type SonnerInput = string | SonnerMessage;

type PromiseMessage<T> = SonnerInput | ((value: T) => SonnerInput);

export interface SonnerPromiseOptions<T> {
  /** Shown while the promise is pending. */
  loading: SonnerInput;
  /** Shown when the promise resolves. Can be derived from the resolved value. */
  success: PromiseMessage<T>;
  /** Shown when the promise rejects. Can be derived from the error. */
  error: PromiseMessage<unknown>;
  /** Called once the promise settles. */
  finally?: () => void;
}

function normalize(
  input: SonnerInput,
  options?: SonnerOptions,
): SonnerMessage {
  return typeof input === "string"
    ? { ...options, title: input }
    : { ...input, ...options };
}

function show(type: SonnerType) {
  return (input: SonnerInput, options?: SonnerOptions): SonnerId =>
    push(type, normalize(input, options));
}

export function useSonner() {
  return {
    default: show("default"),
    info: show("info"),
    success: show("success"),
    warning: show("warning"),
    error: show("error"),
    loading: show("loading"),
    /**
     * Shows a loading toast which turns into success or error
     * once the promise settles. Returns the original promise.
     */
    promise<T>(
      promise: Promise<T> | (() => Promise<T>),
      options: SonnerPromiseOptions<T>,
    ): Promise<T> {
      const p = typeof promise === "function" ? promise() : promise;
      const loading = normalize(options.loading);
      const id = push("loading", loading);

      const resolveMessage = <V>(message: PromiseMessage<V>, value: V) =>
        normalize(typeof message === "function" ? message(value) : message, {
          id,
        });

      p.then(
        (value) => push("success", resolveMessage(options.success, value)),
        (error) => push("error", resolveMessage(options.error, error)),
      ).finally(() => options.finally?.());

      return p;
    },
    /** Closes the toast with the given id, or all toasts. */
    dismiss,
    /** Changes the global toaster configuration. */
    configure,
  };
}
