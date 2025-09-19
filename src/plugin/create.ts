import type { CreateRosalanaUIOptions } from "./types";
import { afterAppCreated, createContext, provideContext } from "./context";
/**
 * Vue plugin to initialize Rosalana UI context.
 */
export const createRosalanaApp = {
  install(
    app: any,
    options?: CreateRosalanaUIOptions | (() => CreateRosalanaUIOptions)
  ) {
    const resolved = typeof options === "function" ? options() : options || {};
    const context = createContext(resolved);
    provideContext(app, context);
    afterAppCreated(app, context);
  },
};
