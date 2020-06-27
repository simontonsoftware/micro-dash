import { forEachOfArray } from '../collection/for-each';
import { Existent, Primitive, ValueIteratee } from '../interfaces';

/** @hidden */
export function findExtreme<T extends Existent>(
  array: T[],
  iteratee: ValueIteratee<T, Primitive>,
  shouldReplace: (candidate: Primitive, current: Primitive) => boolean,
): T {
  let current: T | undefined;
  let currentCriterion: Primitive;
  forEachOfArray(array, (candidate) => {
    const candidateCriterion = iteratee(candidate);
    if (
      current === undefined ||
      shouldReplace(candidateCriterion, currentCriterion)
    ) {
      current = candidate;
      currentCriterion = candidateCriterion;
    }
  });
  // tslint:disable-next-line:no-non-null-assertion
  return current!;
}
