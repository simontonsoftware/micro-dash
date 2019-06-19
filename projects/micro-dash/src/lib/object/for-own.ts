import { ObjectIteratee } from "../interfaces";
import { keys } from "./keys";

/**
 * Iterates over own enumerable string keyed properties of an object and invokes `iteratee` for each property. Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,534 bytes
 * - Micro-dash: 264 bytes
 */
export function forOwn<T>(
  object: T,
  iteratee: ObjectIteratee<T, void | boolean>,
) {
  for (const key of keys(object)) {
    if (iteratee(object[key as keyof T], key) === false) {
      break;
    }
  }
  return object;
}
