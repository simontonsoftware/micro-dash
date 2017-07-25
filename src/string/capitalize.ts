import {upperFirst} from './upper-first';

/**
 * Converts the first character of string to upper case and the remaining to lower case.
 *
 * **Differences from lodash:**
 * - requires `string` to be a string
 */
export function capitalize(string: string) {
  return upperFirst(string.toLowerCase());
}
