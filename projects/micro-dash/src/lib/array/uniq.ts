/**
 * Creates a duplicate-free version of an array, using `SameValueZero` for equality comparisons, in which only the first occurrence of each element is kept. The order of result values is determined by the order they occur in the array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,751 bytes
 * - Micro-dash: 36 bytes
 */
export function uniq<T>(array: T[]): T[] {
  return Array.from(new Set(array));
}
