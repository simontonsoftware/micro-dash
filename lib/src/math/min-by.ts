import {ArrayIteratee, Existant, Primitive} from '../interfaces';

export function minBy<T extends Existant>(
  array: T[], iteratee: ArrayIteratee<T, Primitive>,
) {
  let min: T | undefined;
  let minValue: Primitive;
  array.forEach((candidate, index) => {
    const value = iteratee(candidate, index);
    if (min === undefined || value < minValue) {
      min = candidate;
      minValue = value;
    }
  });
  return min!;
}
