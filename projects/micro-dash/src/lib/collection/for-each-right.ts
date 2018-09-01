import { ArrayIteratee, ObjectIteratee } from "../interfaces";
import { forOwnRight } from "../object/for-own-right";

/**
 * This method is like `forEach` except that it iterates over elements of `collection` from right to left.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,764 bytes
 * - Micro-dash: 204 bytes
 */

export function forEachRight<T>(
  array: T[] | undefined,
  iteratee: ArrayIteratee<T, void | boolean>,
): T[];
export function forEachRight<T>(
  object: T | undefined,
  iteratee: ObjectIteratee<T, void | boolean>,
): T;

export function forEachRight<T>(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    for (let i = collection.length; --i >= 0; ) {
      if (iteratee(collection[i], i) === false) {
        break;
      }
    }
  } else {
    forOwnRight(collection, iteratee);
  }
  return collection;
}
