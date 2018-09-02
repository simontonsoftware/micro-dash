/**
 * Converts `value` to a string. An empty string is returned for `null` and `undefined` values.
 *
 * Differences:
 * - We don't handle -0 as a special case
 * - `null` and `undefined` array references are blank
 *
 *  * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,026 bytes
 * - Micro-dash: 35 bytes
 */
export function toString(value: any) {
  return [value].toString();
}
