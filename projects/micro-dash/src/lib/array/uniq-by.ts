import { ValueIteratee } from "../interfaces";

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is invoked for each element in `array` to generate the criterion by which uniqueness is computed. The order of result values is determined by the order they occur in the array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,761 bytes
 * - Micro-dash: 102 bytes
 */
export function uniqBy<T>(array: T[], iteratee: ValueIteratee<T, any>): T[] {
  const seen = new Set<T>();
  return array.filter((element) => {
    const key = iteratee(element);
    const isNew = !seen.has(key);
    seen.add(key);
    return isNew;
  });
}
