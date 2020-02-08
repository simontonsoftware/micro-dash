import { ArrayIteratee, ObjectIteratee } from "../interfaces";
import { forOwnOfNonArray } from "../object/for-own";

/**
 * Iterates over elements of `collection` and invokes `iteratee` for each element. Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,759 bytes
 * - Micro-dash: 234 bytes
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
    forEachOfArray(collection, iteratee);
  } else {
    forOwnOfNonArray(collection, iteratee);
  }
  return collection;
}

/** @hidden */
export function forEachOfArray<T>(
  array: T[],
  iteratee: ArrayIteratee<T, void | boolean>,
) {
  for (let i = 0, len = array.length; i < len; ++i) {
    if (iteratee(array[i], i) === false) {
      break;
    }
  }
}
