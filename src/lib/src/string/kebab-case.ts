import {words} from './words';
import {toLower} from './to-lower';

/**
 * Converts string to kebab case.
 *
 * **Differences from lodash:**
 * - treats all non-ascii characters as separators
 * - requires `string` to be a string
 */
export function kebabCase(string: string) {
  return words(string).map(toLower).join('-');
}
