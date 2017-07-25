/**
 * Splits `string` into an array of its words.
 *
 * **Differences from lodash:**
 * - treats all non-ascii characters as separators
 * - requires `string` to be a string
 * - does not accept a `pattern` argument
 */
export function words(string: string): string[] {
  return string
      // between lower & upper
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
      .match(/[A-Za-z0-9]+/g)
    || [];
}
