export type RegistryKey<T> = symbol & { __rosalana_type__?: T };

const registry = new Map<RegistryKey<any> | string, any>();

/**
 * Register a value in the registry under the given key.
 */
export function provide<T>(key: RegistryKey<T> | string, value: T): void {
  registry.set(key, value);
}

/**
 * Retrieve a value from the registry by its key.
 * Throws an error if the key is not found.
 */
export function inject<T>(key: RegistryKey<T> | string): T {
  const value = registry.get(key);
  if (value === undefined) {
    throw new Error(`No provider found for key: ${String(key)}`);
  }
  return value as T;
}

/**
 * Clear a value from the registry by its key.
 */
export function flush<T>(key: RegistryKey<T> | string): void {
  registry.delete(key);
}
