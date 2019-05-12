import { words } from "./words";
import { capitalize } from "./capitalize";

/**
 * Converts `string` to camel case.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,436 bytes
 * - Micro-dash: 333 bytes
 */
export function camelCase(string: string) {
  return words(string)
    .map((w, i) => (i ? capitalize(w) : w.toLowerCase()))
    .join("");
}
