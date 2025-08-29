import { useAppContext } from "./context";
import { Adapter, CreateAdapterOptions } from "./types";

/**
 * Creates an adapter to manage a specific data in the Rosalana UI context.
 * Expects `adapters.{name}` function to be defined in the configuration. For updating the data.
 */
export function createAdapter<T, K extends Record<string, any> = {}>(options: CreateAdapterOptions<T & K>): Adapter<T & K> {
  const ctx = useAppContext();
  const data = options.source() || null;
  ctx[options.name] = data;

  return {
    get: (key?: keyof T | keyof K) => {
      const value = ctx[options.name] as (T & K) | null;
      if (!value) return null;
      return key ? value[key] : value;
    },
    update: async (value: Partial<T & K>): Promise<T & K> => {
      const adapterFn: Adapter<T & K>["update"] | undefined =
        ctx.adapters?.[options.name];

      if (!adapterFn) {
        return Promise.reject(
          new Error(`No ${options.name} adapter configured`)
        );
      }

      return adapterFn(value).then((updated: T & K) => {
        ctx[options.name] = { ...ctx[options.name], ...updated };
        return ctx[options.name];
      });
    },
  };
}