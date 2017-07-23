/**
 * Flattens `array` a single level deep.
 *
 * **Differences from lodash:**
 * - does not flatten `arguments` objects
 */
export function flatten<T>(array: Array<T | T[]>) {
  return ([] as T[]).concat(...array);
}
