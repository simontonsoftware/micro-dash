import { forEachRightOfArray } from '../collection/for-each-right';
import { ObjectIteratee } from '../interfaces';
import { keys, keysOfNonArray } from './keys';

/**
 * This method is like `forOwn` except that it iterates over properties of `object` in the opposite order.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,489 bytes
 * - Micro-dash: 191 bytes
 */
export function forOwnRight<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
): T {
  forEachRightOfArray(keys(object), (key) =>
    iteratee(object[key as keyof T], key),
  );
  return object;
}

/** @hidden */
export function forOwnRightOfNonArray<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
): T {
  forEachRightOfArray(keysOfNonArray(object), (key) =>
    iteratee(object[key as keyof T], key),
  );
  return object;
}
