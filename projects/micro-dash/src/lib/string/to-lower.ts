/**
 * Converts `string`, as a whole, to lower case just like `String#toLowerCase`.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,001 bytes
 * - Micro-dash: 16 bytes
 */
// tslint:disable-next-line:variable-name
export function toLower(string: string) {
  return string.toLowerCase();
}
