import { isFunction, keys } from '../../public-api';
import { StringifiedKey } from '../interfaces';

/**
 * Creates an array of function property names from own enumerable properties of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,504 bytes
 * - Micro-dash: 225 bytes
 */
export function functions<T extends object>(obj: T): Array<StringifiedKey<T>> {
  return keys(obj).filter(
    (key) => key !== 'constructor' && isFunction(obj[key as keyof T]),
  );
}
