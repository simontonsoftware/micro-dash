import { ObjectIteratee } from '../interfaces';
import { forOwn } from './for-own';

/**
 * Creates an object composed of the `object` properties `predicate` returns truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,013 bytes
 * - Micro-dash: 328 bytes
 */
export function pickBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): T extends null | undefined ? {} : Partial<T> {
  const obj: any = {};
  forOwn(object, (item, key) => {
    if (predicate(item, key)) {
      obj[key] = item;
    }
  });
  return obj;
}
