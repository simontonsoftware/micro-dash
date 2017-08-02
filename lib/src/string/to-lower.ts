/**
 * Converts `string`, as a whole, to lower case just like `String#toLowerCase`.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,078 bytes
 * - Micro-dash: 28 bytes
 */
export function toLower(string: string) {
  return string.toLowerCase();
}
