/**
 * Creates a new array concatenating `array` with any additional arrays and/or values.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,395 bytes
 * - Micro-dash: 101 bytes
 */
export function concat<T>(array: T[], ...values: Array<T | T[]>) {
  return array.concat(...values);
}
