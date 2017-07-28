import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forOwn} from '../object/for-own';

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 *
 * Differences from lodash:
 * - does not pass `collection` to `iteratee`
 * - only iterates actual arrays like arrays, not "array-like" objects
 * - `iteratee` may not exit iteration early by explicitly returning `false`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,795 bytes
 * - Micro-dash: 179 bytes
 */

export function forEach<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): T[];
export function forEach<T>(
  object: ObjectWith<T> | undefined, iteratee: ObjectIteratee<T, void>,
): ObjectWith<T>;

export function forEach(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    for (let i = 0, l = collection.length; i < l; ++i) {
      iteratee(collection[i], i);
    }
  } else if (collection) {
    forOwn(collection, iteratee);
  }
  return collection;
}
