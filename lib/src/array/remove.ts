import {ArrayIteratee} from '../interfaces';

/**
 * Removes all elements from array for which `predicate` returns truthy, and returns an array of the removed elements.
 *
 * Differences from lodash:
 * - iterates over `array` in reverse order
 * - does not pass `array` to the predicate
 * - does not support iteratee shorthand; `predicate` must be a function
 *
 * Contibution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,615 bytes
 * - Micro-dash: 89 bytes
 */
export function remove<T>(array: T[], predicate: ArrayIteratee<T, boolean>) {
  const removed: T[] = [];
  for (let i = array.length; --i >= 0; ) {
    if (predicate(array[i], i)) {
      removed.unshift(array[i]);
      array.splice(i, 1);
    }
  }
  return removed;
}
