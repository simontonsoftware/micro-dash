import { ObjectIteratee } from '../interfaces';
import { forOwn } from './for-own';

/**
 * Creates an object composed of the `object` properties `predicate` returns truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,263 bytes
 * - Micro-dash: 186 bytes
 */
export function pickBy<T>(object: T, predicate: ObjectIteratee<T, boolean>) {
  const obj: Partial<T> = {};
  if (object != null) {
    forOwn(object, (item, key) => {
      if (predicate(item, key)) {
        obj[key] = item;
      }
    });
  }
  return obj;
}
