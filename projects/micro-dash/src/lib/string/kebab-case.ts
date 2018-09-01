import { words } from "./words";
import { toLower } from "./to-lower";

/**
 * Converts `string` to kebab case.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,261 bytes
 * - Micro-dash: 247 bytes
 */
export function kebabCase(string: string) {
  return words(string)
    .map(toLower)
    .join("-");
}
