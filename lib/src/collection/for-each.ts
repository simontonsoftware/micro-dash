import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forOwn} from '../object/for-own';

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,832 bytes
 * - Micro-dash: 207 bytes
 */

export function forEach<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): T[];
export function forEach<T>(
  object: T | undefined, iteratee: ObjectIteratee<T, void>,
): T;

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
