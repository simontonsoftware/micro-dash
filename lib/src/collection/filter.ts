import { ArrayIteratee, ObjectIteratee } from '../interfaces';
import { forEach } from './for-each';

/**
 * Iterates over elements of `collection`, returning an array of all elements `predicate` returns truthy for.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,510 bytes
 * - Micro-dash: 279 bytes
 */

export function filter<T>(
  array: T[],
  predicate: ArrayIteratee<T, boolean>,
): T[];
export function filter<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): Array<T[keyof T]>;

export function filter(collection: any, predicate: any) {
  const result: any[] = [];
  forEach(collection, (item, indexOrKey) => {
    if (predicate(item, indexOrKey)) {
      result.push(item);
    }
  });
  return result;
}
