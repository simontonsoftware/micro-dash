/**
 * Checks if `value` is classified as a `Number` primitive.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 695 bytes
 * - Micro-dash: 39 bytes
 */
export function isNumber(value: any): value is number {
  return typeof value === "number";
}
