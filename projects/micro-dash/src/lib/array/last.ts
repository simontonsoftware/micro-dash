/**
 * Gets the last element of array.
 *
 * Differences from lodash:
 * - no special consideration is given to string-keyed values set on the array
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 69 bytes
 * - Micro-dash: 24 bytes
 */
export function last<T>(array: T[]) {
  return array[array.length - 1];
}
