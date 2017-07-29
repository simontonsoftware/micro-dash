import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forOwnRight} from '../object/for-own-right';

/**
 * This method is like `forEach` except that it iterates over elements of `collection` from right to left.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,793 bytes
 * - Micro-dash: 169 bytes
 */

export function forEachRight<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): T[];
export function forEachRight<T>(
  array: ObjectWith<T> | undefined, iteratee: ObjectIteratee<T, void>,
): ObjectWith<T>;

export function forEachRight<T>(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    for (let i = collection.length; --i >= 0; ) {
      iteratee(collection[i], i);
    }
  } else if (collection) {
    forOwnRight(collection, iteratee);
  }
  return collection;
}
