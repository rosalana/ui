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

      // 1. Pokud není sync režim, použij pouze `update()` callback
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

      // 2. Pokud je sync režim, očekáváme adapterFn definovaný v contextu
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

// /**
//  * Creates an adapter to manage a specific data in the Rosalana UI context.
//  * Expects `adapters.{name}` function to be defined in the configuration. For updating the data.
//  */
// export function createAdapter<T, K extends Record<string, any> = {}>(
//   options: CreateAdapterOptions<T & K>
// ): Adapter<T & K> {
//   const ctx = useAppContext();
//   const name = options.name;
//   createSourceReference<T & K>(options, ctx);

//   return {
//     get: (key?: keyof T | keyof K) => {
//       const value = ctx[name] as (T & K) | null;
//       if (!value) return null;
//       return key ? value[key] : value;
//     },
//     // je potřeba lépe vyřešit async|sync + object|stirng[]
//     update: async (value: Partial<T & K>): Promise<T & K> => {
//       console.log("adapter update", name, value);
//       return Promise.resolve({} as T & K);
//       //   const sync = options.sync ?? true;
//       //   const beforeUpdate = options.update ? options.update(value) : null;

//       //   if (!sync) {
//       //     if (beforeUpdate instanceof Promise) {
//       //       if (typeof ctx[options.name] === "object") {
//       //         ctx[options.name] = {
//       //           ...ctx[options.name],
//       //           ...(await beforeUpdate),
//       //         };
//       //       } else {
//       //         ctx[options.name] = await beforeUpdate;
//       //       }
//       //     } else {
//       //       if (typeof ctx[options.name] === "object") {
//       //         ctx[options.name] = { ...ctx[options.name], ...beforeUpdate };
//       //       } else {
//       //         ctx[options.name] = beforeUpdate as T & K;
//       //       }
//       //     }
//       //     return Promise.resolve(ctx[options.name]);
//       //   }

//       //   const adapterFn: Adapter<T & K>["update"] | undefined =
//       //     ctx.adapters?.[options.name];

//       //   if (!adapterFn) {
//       //     return Promise.reject(
//       //       new Error(`No ${options.name} adapter configured`)
//       //     );
//       //   }

//       //   return adapterFn(value).then((updated: T & K) => {
//       //     if (typeof ctx[options.name] !== "object") {
//       //       ctx[options.name] = updated;
//       //       return ctx[options.name];
//       //     }
//       //     ctx[options.name] = { ...ctx[options.name], ...updated };
//       //     return ctx[options.name];
//       //   });
//     },
//   };
// }

// function createSourceReference<T = any>(
//   options: CreateAdapterOptions<T>,
//   ctx: RosalanaUIContext
// ): void {
//   const { source, name } = options;

//   // Resolve sourceRef: může to být funkce nebo přímo ref/computed
//   const resolved = typeof source === "function" ? source() : source;

//   // Inicializuj hodnotu (pokud tam už není)
//   if (!ctx[name]) {
//     ctx[name] = unref(resolved);
//   }

//   // Sleduj změny a aktualizuj context
//   watch(
//     resolved,
//     (newValue) => {
//       console.log("createSourceReference watch", name, newValue);
//       ctx[name] = newValue;
//     },
//     { immediate: true, deep: true }
//   );
// }
