import { type App, reactive, inject as injectVue } from "vue";
import { CreateRosalanaUIOptions, RosalanaUIContext } from "./types";
import buildContext from "./builder";
import { inject, provide, type RegistryKey } from "./provider";

const ROSALANA_UI_CONTEXT: RegistryKey<RosalanaUIContext> =
  Symbol("RosalanaUI");

const ROSALANA_UI_DEFAULTS: RegistryKey<RosalanaUIContext> =
  Symbol("RosalanaUIDefaults");

export function createContext(
  config: CreateRosalanaUIOptions
): RosalanaUIContext {
  return buildContext(config);
}

export function provideContext(app: App, context: RosalanaUIContext): void {
  provide(ROSALANA_UI_CONTEXT, reactive(context));
  provide(ROSALANA_UI_DEFAULTS, context);

  app.provide(ROSALANA_UI_CONTEXT, inject(ROSALANA_UI_CONTEXT));
  app.provide(ROSALANA_UI_DEFAULTS, inject(ROSALANA_UI_DEFAULTS));
}

/**
 * Composable to access the runtime Rosalana UI context.
 */
export function useAppContext(): RosalanaUIContext {
  const ctx = inject(ROSALANA_UI_CONTEXT);
  if (!ctx) throw new Error("RosalanaUI plugin is not initialized");
  return ctx;
}

/**
 * Composable to access the default Rosalana UI configuration.
 */
export function useAppDefaults(): RosalanaUIContext {
  const ctx = inject(ROSALANA_UI_DEFAULTS);
  if (!ctx) throw new Error("RosalanaUI plugin is not initialized");
  return ctx;
}
