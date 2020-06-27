import { ArrayIteratee, ObjectIteratee } from '../interfaces';
import { forOwnRightOfNonArray } from '../object/for-own-right';

/**
 * This method is like `forEach` except that it iterates over elements of `collection` from right to left.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,777 bytes
 * - Micro-dash: 217 bytes
 */

export function forEachRight<T>(
  array: T[] | undefined,
  iteratee: ArrayIteratee<T, void | boolean>,
): T[];
export function forEachRight<T>(
  object: T | undefined,
  iteratee: ObjectIteratee<T, void | boolean>,
): T;

export function forEachRight(collection: any, iteratee: any): any {
  if (Array.isArray(collection)) {
    forEachRightOfArray(collection, iteratee);
  } else {
    forOwnRightOfNonArray(collection, iteratee);
  }
  return collection;
}

/** @hidden */
export function forEachRightOfArray<T>(
  array: T[],
  iteratee: ArrayIteratee<T, void | boolean>,
): void {
  for (let i = array.length; --i >= 0; ) {
    if (iteratee(array[i], i) === false) {
      break;
    }
  }
}
