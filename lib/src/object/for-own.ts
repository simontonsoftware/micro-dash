import {ObjectIteratee, ObjectWith} from '../interfaces';

/**
 * Iterates over own enumerable string keyed properties of an object and invokes `iteratee` for each property.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 * - `iteratee` may not exit iteration early by explicitly returning `false`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 */
export function forOwn<T>(
  object: ObjectWith<T>, iteratee: ObjectIteratee<T, void>,
) {
  for (const key of Object.getOwnPropertyNames(object)) {
    iteratee(object[key], key);
  }
  return object;
}
