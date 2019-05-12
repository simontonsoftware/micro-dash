import { forEach } from "../collection/for-each";
import { Existant, Primitive, ValueIteratee } from "../interfaces";

/**
 * This method is like `min` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,070 bytes
 * - Micro-dash: 438 bytes
 */
export function minBy<T extends Existant>(
  array: T[],
  iteratee: ValueIteratee<T, Primitive>,
) {
  let min: T | undefined;
  let minCriterion: Primitive;
  forEach(array, (value) => {
    const criterion = iteratee(value);
    if (min === undefined || criterion < minCriterion) {
      min = value;
      minCriterion = criterion;
    }
  });
  return min!;
}
