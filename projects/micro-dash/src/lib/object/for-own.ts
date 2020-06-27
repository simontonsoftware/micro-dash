import { forEachOfArray } from '../collection/for-each';
import { ObjectIteratee } from '../interfaces';
import { keys, keysOfNonArray } from './keys';

/**
 * Iterates over own enumerable string keyed properties of an object and invokes `iteratee` for each property. Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,514 bytes
 * - Micro-dash: 213 bytes
 */
export function forOwn<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
): T {
  forEachOfArray(keys(object), (key) => iteratee(object[key as keyof T], key));
  return object;
}

/** @hidden */
export function forOwnOfNonArray<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
): T {
  forEachOfArray(keysOfNonArray(object), (key) =>
    iteratee(object[key as keyof T], key),
  );
  return object;
}
