import { toLower } from "./to-lower";
import { words } from "./words";

/**
 * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,386 bytes
 * - Micro-dash: 237 bytes
 */
// tslint:disable-next-line:variable-name
export function kebabCase(string: string) {
  return words(string)
    .map(toLower)
    .join("-");
}
