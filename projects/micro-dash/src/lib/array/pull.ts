import {remove} from './remove';

/**
 * Removes all given values from array using `SameValueZero` for equality comparisons.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,213 bytes
 * - Micro-dash: 264 bytes
 */
export function pull<T>(array: T[], ...values: T[]) {
  for (const value of values) {
    remove(array, (item) => Object.is(item, value));
  }
  return array;
}
