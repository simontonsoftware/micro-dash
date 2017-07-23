/**
 * Flattens `array` a single level deep.
 */
export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array);
}
