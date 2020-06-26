import { upperFirst } from './upper-first';

/**
 * Converts the first character of `string` to upper case and the remaining to lower case.
 *
 * Differences from lodash:
 * - requires `string` to be a string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,948 bytes
 * - Micro-dash: 72 bytes
 */
// tslint:disable-next-line:variable-name
export function capitalize(string: string) {
  return upperFirst(string.toLowerCase());
}
