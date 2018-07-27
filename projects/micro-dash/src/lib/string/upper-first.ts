/**
 * Converts the first character of `string` to upper case.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,105 bytes
 * - Micro-dash: 49 bytes
 */
export function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
