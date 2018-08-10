import { forEachRight } from '../collection/for-each-right';
import { ObjectIteratee } from '../interfaces';
import { keys } from './keys';

/**
 * This method is like `forOwn` except that it iterates over properties of `object` in the opposite order.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,473 bytes
 * - Micro-dash: 192 bytes
 */
export function forOwnRight<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
) {
  forEachRight(keys(object), (key) => iteratee(object[key as keyof T], key));
  return object;
}
