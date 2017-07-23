import {Falsey} from '../interfaces';
import {identity} from '../util/identity';

/**
 * Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 */
export function compact<T>(array: Array<T | Falsey>) {
  return array.filter(identity) as T[];
}
