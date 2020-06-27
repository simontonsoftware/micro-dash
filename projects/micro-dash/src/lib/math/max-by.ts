import { Existent, Primitive, ValueIteratee } from '../interfaces';
import { findExtreme } from './extreme-utils';

/**
 * This method is like `max` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which the value is ranked.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 8,343 bytes
 * - Micro-dash: 143 bytes
 */
export function maxBy<T extends Existent>(
  array: T[],
  iteratee: ValueIteratee<T, Primitive>,
): T {
  return findExtreme(
    array,
    iteratee,
    (candidate, current) => candidate > current,
  );
}
