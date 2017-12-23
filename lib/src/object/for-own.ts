import {ObjectIteratee, ObjectWith} from '../interfaces';

/**
 * Iterates over own enumerable string keyed properties of an object and invokes `iteratee` for each property.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,556 bytes
 * - Micro-dash: 96 bytes
 */
export function forOwn<T>(
  object: T, iteratee: ObjectIteratee<T, void | boolean>,
) {
  for (const key of Object.getOwnPropertyNames(object)) {
    if (iteratee(object[key], key as keyof T) === false) {
      break;
    }
  }
  return object;
}
