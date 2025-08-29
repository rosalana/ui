import { useAppContext } from "./context";
import { Adapter, CreateAdapterOptions } from "./types";

/**
 * Creates an adapter to manage a specific data in the Rosalana UI context.
 * Expects `adapters.{name}` function to be defined in the configuration. For updating the data.
 */
export function createAdapter<T, K extends Record<string, any> = {}>(
  options: CreateAdapterOptions<T & K>
): Adapter<T & K> {
  const ctx = useAppContext();
  const data = options.source() || null;
  ctx[options.name] = data;

  return {
    get: (key?: keyof T | keyof K) => {
      const value = ctx[options.name] as (T & K) | null;
      if (!value) return null;
      return key ? value[key] : value;
    },
    // je potřeba lépe vyřešit async|sync + object|stirng[]
    update: async (value: Partial<T & K>): Promise<T & K> => {
      const sync = options.sync ?? true;
      const beforeUpdate = options.update ? options.update(value) : null;

      if (!sync) {
        if (beforeUpdate instanceof Promise) {
          if (typeof ctx[options.name] === "object") {
            ctx[options.name] = {
              ...ctx[options.name],
              ...(await beforeUpdate),
            };
          } else {
            ctx[options.name] = await beforeUpdate;
          }
        } else {
          if (typeof ctx[options.name] === "object") {
            ctx[options.name] = { ...ctx[options.name], ...beforeUpdate };
          } else {
            ctx[options.name] = beforeUpdate as T & K;
          }
        }
        return Promise.resolve(ctx[options.name]);
      }

      const adapterFn: Adapter<T & K>["update"] | undefined =
        ctx.adapters?.[options.name];

      if (!adapterFn) {
        return Promise.reject(
          new Error(`No ${options.name} adapter configured`)
        );
      }

      return adapterFn(value).then((updated: T & K) => {
        if (typeof ctx[options.name] !== "object") {
          ctx[options.name] = updated;
          return ctx[options.name];
        }
        ctx[options.name] = { ...ctx[options.name], ...updated };
        return ctx[options.name];
      });
    },
  };
}
