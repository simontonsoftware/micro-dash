/**
 * Creates an object composed of the picked object properties.
 *
 * **Differences from lodash:**
 * - `paths` must be direct properties of `object` (they cannot references deep properties)
 */
export function pick<T>(object: T, paths: [keyof T]) {
  const obj: Partial<T> = {};
  for (const path of paths) {
    obj[path] = object[path];
  }
  return obj;
}
