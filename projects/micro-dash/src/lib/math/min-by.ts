import { forEachOfArray } from '../collection/for-each';
import { Existent, Primitive, ValueIteratee } from '../interfaces';

/**
 * This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 8,308 bytes
 * - Micro-dash: 117 bytes
 */
export function minBy<T extends Existent>(
  array: T[],
  iteratee: ValueIteratee<T, Primitive>,
): T {
  let min: T | undefined;
  let minCriterion: Primitive;
  forEachOfArray(array, (value) => {
    const criterion = iteratee(value);
    if (min === undefined || criterion < minCriterion) {
      min = value;
      minCriterion = criterion;
    }
  });
  // tslint:disable-next-line:no-non-null-assertion
  return min!;
}
