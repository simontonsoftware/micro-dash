/**
 * Checks if `value` is classified as a `Function` object.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 815 bytes
 * - Micro-dash: 41 bytes
 */
export function isFunction(value: any): value is (...args: any[]) => any {
  return typeof value === "function";
}
