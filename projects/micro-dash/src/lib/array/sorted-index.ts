import { compareValues } from '../collection/sort-by';
import { Nil } from '../interfaces';

/**
 * Uses a binary search to determine the lowest index at which `value` should be inserted into `array` in order to maintain its sort order.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,266 bytes
 * - Micro-dash: 239 bytes
 */
export function sortedIndex<T>(array: T[] | Nil, value: T): number {
  let min = 0;
  let max = array ? array.length - 1 : 0;
  while (max > min) {
    const mid = Math.floor((max + min) / 2);
    if (compareValues(array![mid], value) < 0) {
      min = mid + 1;
    } else {
      max = mid;
    }
  }
  return min;
}
