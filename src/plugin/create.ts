import type { CreateRosalanaUIOptions } from "./types";
import { afterAppCreated, createContext, provideContext } from "./context";
import { addCollection } from "@iconify/vue";
import lucide from "@iconify-json/lucide/icons.json";
import logos from "@iconify-json/logos/icons.json";

// Register icon sets locally — no CDN requests
addCollection(lucide);
addCollection(logos);
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
