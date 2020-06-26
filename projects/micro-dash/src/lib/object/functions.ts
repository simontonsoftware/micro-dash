import { isFunction, keys } from '../../public-api';

/**
 * Creates an array of function property names from own enumerable properties of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,486 bytes
 * - Micro-dash: 225 bytes
 */
export function functions<T extends object>(obj: T) {
  return keys(obj).filter(
    (key) => key !== 'constructor' && isFunction(obj[key as keyof T]),
  );
}
