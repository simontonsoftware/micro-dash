import { capitalize } from "./capitalize";
import { words } from "./words";

/**
 * Converts `string` to camel case.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,449 bytes
 * - Micro-dash: 302 bytes
 */
// tslint:disable-next-line:variable-name
export function camelCase(string: string) {
  return words(string)
    .map((w, i) => (i ? capitalize(w) : w.toLowerCase()))
    .join("");
}
