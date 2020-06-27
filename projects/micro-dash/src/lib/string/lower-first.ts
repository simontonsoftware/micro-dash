import { Nil } from '../interfaces';

/**
 * Converts the first character of `string` to lower case.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,951 bytes
 * - Micro-dash: 63 bytes
 */
// tslint:disable-next-line:variable-name
export function lowerFirst(string: string | Nil): string {
  return string ? string.charAt(0).toLowerCase() + string.slice(1) : '';
}
