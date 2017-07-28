import {Existant, Primitive} from '../interfaces';
import {forEach} from '../collection/for-each';

/**
 * This method is like `min` except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 *
 * Differences from lodash:
 * - does not support iteratee shorthand; `iteratee` must be a function
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,185 bytes
 * - Micro-dash: 86 bytes
 */
export function minBy<T extends Existant>(
  array: T[], iteratee: (value: T) => Primitive,
) {
  let min: T | undefined;
  let minValue: Primitive;
  forEach(array, (value) => {
    const criterion = iteratee(value);
    if (min === undefined || criterion < minValue) {
      min = value;
      minValue = criterion;
    }
  });
  return min!;
}
