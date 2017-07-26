import {ArrayIteratee, Existant, Primitive} from '../interfaces';

export function minBy<T extends Existant>(
  array: T[], iteratee: (value: T) => Primitive,
) {
  let min: T | undefined;
  let minValue: Primitive;
  array.forEach((value) => {
    const criterion = iteratee(value);
    if (min === undefined || criterion < minValue) {
      min = value;
      minValue = criterion;
    }
  });
  return min!;
}
