/**
 * Converts the first character of `string` to upper case.
 *
 * **Differences from lodash:**
 * - requires `string` to be a string
 */
export function upperFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
