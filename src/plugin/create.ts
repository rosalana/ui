import type { CreateRosalanaUIOptions } from "./types";
import { afterAppCreated, createContext, provideContext } from "./context";
import { mountVirtual } from "./virtual";
import { configure as configureSonner } from "../composables/useSonner/state";
import { addCollection, IconifyJSON } from "@iconify/vue";
import { icons as lucide } from "@iconify-json/lucide";
import { icons as logos } from "@iconify-json/logos";
import { icons as mdi } from "@iconify-json/mdi";
import { icons as simpleIcons } from "@iconify-json/simple-icons";

// Register icon sets locally — no CDN requests
addCollection(lucide as IconifyJSON);
addCollection(logos as IconifyJSON);
addCollection(mdi as IconifyJSON);
addCollection(simpleIcons as IconifyJSON);
/**
 * Vue plugin to initialize Rosalana UI context.
 */
export const createRosalanaApp = {
  install(
    app: any,
    options?: CreateRosalanaUIOptions | (() => CreateRosalanaUIOptions),
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
