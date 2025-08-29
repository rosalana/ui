import { type App, type InjectionKey, reactive, inject } from "vue";
import { CreateRosalanaUIOptions, RosalanaUIContext } from "./types";
import buildContext from "./builder";

const ROSALANA_UI_CONTEXT: InjectionKey<RosalanaUIContext> =
  Symbol("RosalanaUI");

const ROSALANA_UI_DEFAULTS: InjectionKey<RosalanaUIContext> =
  Symbol("RosalanaUIDefaults");

export function createContext(
  config: CreateRosalanaUIOptions
): RosalanaUIContext {
  return buildContext(config);
}

export function provideContext(app: App, context: RosalanaUIContext): void {
  app.provide(ROSALANA_UI_DEFAULTS, context);
  app.provide(ROSALANA_UI_CONTEXT, reactive(context));
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
export function useAppDefaults(): CreateRosalanaUIOptions {
  const ctx = inject(ROSALANA_UI_DEFAULTS);
  if (!ctx) throw new Error("RosalanaUI plugin is not initialized");
  return ctx;
}
