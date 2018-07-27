import { forEach } from '../collection/for-each';
import { Existant, Primitive, ValueIteratee } from '../interfaces';

/**
 * This method is like `min` except that it accepts iteratee which is invoked for each element in array to generate the criterion by which the value is ranked.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 13,897 bytes
 * - Micro-dash: 421 bytes
 */
export function minBy<T extends Existant>(
  array: T[],
  iteratee: ValueIteratee<T, Primitive>,
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
