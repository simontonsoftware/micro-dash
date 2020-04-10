/**
 * Creates an array excluding all given values.
 *
 * Differences from lodash:
 * - Uses triple equals rather than `SameValueZero`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,643 bytes
 * - Micro-dash: 47 bytes
 */
export function without<T>(array: T[], ...values: T[]) {
  return array.filter((item) => values.indexOf(item) === -1);
}
