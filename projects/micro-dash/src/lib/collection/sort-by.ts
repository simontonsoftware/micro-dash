import { ArrayIteratee, ObjectIteratee } from '../interfaces';
import { castArray } from '../lang';
import { map } from './map';

/**
 * Creates an array of elements, sorted in ascending order by the results of running each element in a collection thru each iteratee. This method performs a stable sort, that is, it preserves the original sort order of equal elements.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 16,033 bytes
 * - Micro-dash: 622 bytes
 */

export function sortBy<T>(
  array: T[],
  iteratees: ArrayIteratee<T, any> | Array<ArrayIteratee<T, any>>,
): T[];
export function sortBy<T>(
  object: T,
  iteratees: ObjectIteratee<T, any> | Array<ObjectIteratee<T, any>>,
): Array<T[keyof T]>;

export function sortBy(collection: any, iteratees: Function | Function[]): any {
  const fns = castArray(iteratees);

  let index = 0;
  const metas = map(collection, (value) => {
    const meta: Meta = [] as any;
    meta.value = value;
    for (const fn of fns) {
      const v = fn(value);
      meta.push(ordinal(v), v);
    }
    meta.push(index++);
    return meta;
  });

  metas.sort((m1, m2): any => {
    for (let i = 0; i < m1.length; ++i) {
      if (m1[i] < m2[i]) {
        return -1;
      } else if (m1[i] > m2[i]) {
        return 1;
      }
    }
  });

  return metas.map((e) => e.value);
}

/** @hidden */
function ordinal(value: any): number {
  if (Number.isNaN(value)) {
    return 3;
  }
  if (value === undefined) {
    return 2;
  }
  if (value === null) {
    return 1;
  }
  return 0;
}

/** @hidden */
interface Meta extends Array<any> {
  value: number;
}
