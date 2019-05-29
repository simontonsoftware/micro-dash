import { words } from "./words";
import { toLower } from "./to-lower";

/**
 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,386 bytes
 * - Micro-dash: 237 bytes
 */
export function kebabCase(string: string) {
  return words(string)
    .map(toLower)
    .join("-");
}
