import { unref, watch } from "vue";
import { useAppContext } from "./context";
import { Adapter, CreateAdapterOptions, RosalanaUIContext } from "./types";

/**
 * Create a reactive adapter for a value stored in the AppContext.
 */
export function createAdapter<T, K extends Record<string, any> = {}>(
  options: CreateAdapterOptions<T & K>
): Adapter<T & K> {
  const ctx = useAppContext();
  const name = options.name;

  // Create reactivity between external source and context
  createSourceReference(options, ctx);

  return {
    get: (key?: keyof T | keyof K) => {
      const value = ctx[name] as (T & K) | null;
      if (!value) return null;
      return key ? value[key] : value;
    },

    update: async (value: Partial<T & K>): Promise<T & K> => {
      const sync = options.sync ?? true;

      // When sync is disabled, just update the context directly
      if (!sync) {
        const result = options.update ? options.update(value) : value;
        const newValue = result instanceof Promise ? await result : result;

        // Merge nebo přímé přepsání
        if (typeof ctx[name] === "object") {
          ctx[name] = { ...ctx[name], ...newValue };
        } else {
          ctx[name] = newValue as T & K;
        }

        return ctx[name];
      }

      // When sync is enabled, use the adapter function from config
      const adapterFn: Adapter<T & K>["update"] | undefined =
        ctx.adapters?.[name];

      if (!adapterFn) {
        return Promise.reject(
          new Error(`No adapter function configured for "${name}"`)
        );
      }

      const updated = await adapterFn(value);

      if (typeof ctx[name] === "object") {
        ctx[name] = { ...ctx[name], ...updated };
      } else {
        ctx[name] = updated;
      }

      return ctx[name];
    },
  };
}

/**
 * Binds external reactive source to the AppContext via the given name.
 */
function createSourceReference<T = any>(
  options: CreateAdapterOptions<T>,
  ctx: RosalanaUIContext
): void {
  const { source, name } = options;

  const resolved = typeof source === "function" ? source() : source;

  if (!ctx[name]) {
    ctx[name] = unref(resolved);
  }

  watch(
    resolved,
    (newValue) => {
      ctx[name] = newValue;
    },
    { immediate: true, deep: true }
  );
}
