import {
  IfIndexType,
  Key,
  Nil,
  ObjectWith,
  ValueIteratee,
} from '../interfaces';
import { transform } from '../object/transform';

/**
 * Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The order of grouped values is determined by the order they occur in `collection`. The corresponding value of each key is an array of elements responsible for generating the key.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,388 bytes
 * - Micro-dash: 322 bytes
 */
export function groupBy<T, K extends Key>(
  collection: T[] | ObjectWith<T> | Nil,
  iteratee: ValueIteratee<T, K>,
): { [k in K]: IfIndexType<K, T[], T[] | undefined> } {
  return transform(
    collection as any,
    (accumulator, value: any) => {
      const key = iteratee(value);
      let group = accumulator[key];
      if (!Array.isArray(group)) {
        accumulator[key] = group = [];
      }
      group.push(value);
    },
    {} as any,
  );
}
