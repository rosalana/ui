import type { CreateRosalanaUIOptions } from "./types";
import { afterAppCreated, createContext, provideContext } from "./context";
import { mountVirtual } from "./virtual";
import { configure as configureSonner } from "../composables/useSonner/state";
import { addCollection, IconifyJSON } from "@iconify/vue";
import lucide from "@iconify-json/lucide/icons.json";
import logos from "@iconify-json/logos/icons.json";

// Register icon sets locally — no CDN requests
addCollection(lucide as IconifyJSON);
addCollection(logos as IconifyJSON);
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

    if (resolved.sonner) configureSonner(resolved.sonner);

    /** virtual layer */
    mountVirtual(app);
  },
};
