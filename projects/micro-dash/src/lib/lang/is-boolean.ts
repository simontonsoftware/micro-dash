/**
 * Checks if `value` is classified as a boolean primitive.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 693 bytes
 * - Micro-dash: 35 bytes
 */
export function isBoolean(value: any): value is boolean {
  return value === true || value === false;
}
