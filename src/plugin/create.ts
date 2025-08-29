import { App } from "vue";
import type { CreateRosalanaUIOptions } from "./types";
import { createContext, provideContext } from "./context";

/**
 * Vue plugin to initialize Rosalana UI context.
 */
export function createRosalanaApp(
  setup: CreateRosalanaUIOptions | (() => CreateRosalanaUIOptions)
) {
  return {
    install(app: App) {
      const resolved = typeof setup === "function" ? setup() : setup;
      const context = createContext(resolved);

      provideContext(app, context);
    },
  };
}
