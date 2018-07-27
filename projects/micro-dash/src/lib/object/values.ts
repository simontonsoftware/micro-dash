import {ObjectWith} from '../interfaces';

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,437 bytes
 * - Micro-dash: 72 bytes
 */
export function values<T>(object: ObjectWith<T>) {
  return Object.getOwnPropertyNames(object).map((key) => object[key]);
}
