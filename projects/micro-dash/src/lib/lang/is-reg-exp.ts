/**
 * Checks if `value` is classified as a `RegExp` object.
 *
 * Differences from lodash:
 * - returns `true` for subclasses of `RegExp`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,041 bytes
 * - Micro-dash: 41 bytes
 */
export function isRegExp(value: any): value is RegExp {
  return value instanceof RegExp;
}
