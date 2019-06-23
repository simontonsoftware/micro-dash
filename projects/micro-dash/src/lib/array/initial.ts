/**
 * Gets all but the last element of `array`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 208 bytes
 * - Micro-dash: 32 bytes
 */
export function initial<T>(array: T[]) {
  return array.slice(0, array.length - 1);
}
