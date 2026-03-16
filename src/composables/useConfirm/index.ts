import { accessGlobal } from "../../plugin/virtual";
import { state } from "./state";
import type {
  ConfirmOptions,
  MatchConfirmOptions,
  VerifyConfirmOptions,
} from "./state";
import ConfirmDialog from "./ConfirmDialog.vue";

// Auto-register the dialog into the virtual layer once.
accessGlobal(ConfirmDialog);

export function useConfirm() {
  return {
    confirm(options?: string | ConfirmOptions): Promise<boolean> {
      return new Promise((resolve) => {
        if (typeof options === "string") {
          state.options = { title: options };
        } else {
          state.options = options || {};
        }

        state.variant = "confirm";
        state.open = true;
        state.resolve = resolve;
      });
    },
    match(options: string | MatchConfirmOptions, matchWord?: string) {
      return new Promise((resolve) => {
        if (typeof options === "string") {
          state.options = {
            title: options,
            callback: async (input: string) =>
              !matchWord ? false : input === matchWord,
          };
        } else {
          state.options = {
            ...options,
            callback: async (input: string) => input === options.match,
          };
        }

        state.variant = "verify";
        state.open = true;
        state.resolve = resolve;
      });
    },
    verify(
      options: string | VerifyConfirmOptions,
      verifyCallback?: VerifyConfirmOptions["callback"],
    ) {
      return new Promise((resolve) => {
        if (typeof options === "string") {
          state.options = {
            title: options,
            callback: verifyCallback || (async () => false),
          };
        } else {
          state.options = options;
        }

        state.variant = "verify";
        state.open = true;
        state.resolve = resolve;
      });
    },
  };
}

// export function useConfirm() {
//   return (options: string | ConfirmOptions): Promise<boolean> => {
//     return new Promise((resolve) => {
//       state.open = true;
//       state.options =
//         typeof options === "string" ? { title: options } : options;
//       state.resolve = resolve;
//     });
//   };
// }
