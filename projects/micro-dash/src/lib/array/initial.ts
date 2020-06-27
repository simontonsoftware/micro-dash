/**
 * Gets all but the last element of `array`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 207 bytes
 * - Micro-dash: 15 bytes
 */
export function initial<T>(array: T[]): T[] {
  return array.slice(0, -1);
}
