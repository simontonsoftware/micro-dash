import {Falsey} from '../interfaces';
import {identity} from '../util/identity';

/**
 * Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * Contibution to minified bundle size, when it is the only function imported:
 * - Lodash: 89 bytes
 * - Micro-dash: 48 bytes
 */
export function compact<T>(array: Array<T | Falsey>) {
  return array.filter(identity) as T[];
}
