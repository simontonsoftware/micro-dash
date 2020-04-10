/**
 * Splits `string` into an array of its words.
 *
 * Differences from lodash:
 * - does not accept a `pattern` argument
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,361 bytes
 * - Micro-dash: 176 bytes
 */
// tslint:disable-next-line:variable-name
export function words(string: string): string[] {
  return (
    string
      // between lower & upper
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      // between number & letter
      .replace(/(\d)([A-Za-z])/g, "$1 $2")
      .replace(/([A-Za-z])(\d)/g, "$1 $2")
      // before last upper in a sequence followed by lower
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, "$1 $2$3")
      .match(/[A-Za-z0-9]+/g) || []
  );
}
