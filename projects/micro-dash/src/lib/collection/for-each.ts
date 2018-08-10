import { ArrayIteratee, ObjectIteratee } from '../interfaces';
import { forOwn } from '../object/for-own';

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,758 bytes
 * - Micro-dash: 362 bytes
 */

export function forEach<T>(
  array: T[] | undefined,
  iteratee: ArrayIteratee<T, void | boolean>,
): T[];
export function forEach<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
): T;

export function forEach(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    for (let i = 0, l = collection.length; i < l; ++i) {
      if (iteratee(collection[i], i) === false) {
        break;
      }
    }
  } else {
    forOwn(collection, iteratee);
  }
  return collection;
}
