/**
 * Flattens `array` a single level deep.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,188 bytes
 * - Micro-dash: 39 bytes
 */
export function flatten<T>(array: Array<T | T[]>) {
  return ([] as T[]).concat(...array);
}
