import {words} from './words';
import {capitalize} from './capitalize';

/**
 * Converts string to camel case.
 *
 * **Differences from lodash:**
 * - treats all non-ascii characters as separators
 * - requires `string` to be a string
 */
export function camelCase(string: string) {
  return words(string)
    .map((w, i) => i ? capitalize(w) : w.toLowerCase())
    .join('');
}
