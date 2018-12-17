import { Nil } from "../interfaces";
import { times } from "../util";

/**
 * Creates an array of grouped elements, the first of which contains the first elements of the given arrays, the second of which contains the second elements of the given arrays, and so on.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,862 bytes
 * - Micro-dash: 266 bytes
 */

export function zip<T1, T2>(
  array1: T1[],
  array2: T2[],
): Array<[T1 | undefined, T2 | undefined]>;
export function zip<T1, T2, T3>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
): Array<[T1 | undefined, T2 | undefined, T3 | undefined]>;
export function zip<T1, T2, T3, T4>(
  array1: T1[],
  array2: T2[],
  array3: T3[],
  array4: T4[],
): Array<[T1 | undefined, T2 | undefined, T3 | undefined, T4 | undefined]>;
export function zip<T>(
  ...arrays: Array<T[] | Nil>
): Array<Array<T | Nil>>;

export function zip<T>(...arrays: Array<T[] | Nil>) {
  const length = Math.max(0, ...arrays.map((a) => (a ? a.length : 0)));
  return times(length, (i) => arrays.map((a) => (a ? a[i] : undefined)));
}
