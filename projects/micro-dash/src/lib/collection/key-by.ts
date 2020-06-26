import { IfIndexType, Key, Nil, ValueIteratee } from '../interfaces';
import { forEach } from './for-each';

/**
 * Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The corresponding value of each key is the last element responsible for generating the key.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,302 bytes
 * - Micro-dash: 265 bytes
 */

export function keyBy<T, K extends Key>(
  array: T[] | Nil,
  iteratee: ValueIteratee<T, K>,
): IfIndexType<K, { [key in K]: T }, { [key in K]?: T }>;
export function keyBy<T, K extends Key>(
  object: T | Nil,
  iteratee: ValueIteratee<T[keyof T], K>,
): IfIndexType<K, { [key in K]: T[keyof T] }, { [key in K]?: T[keyof T] }>;

export function keyBy(collection: any, iteratee: Function) {
  const obj: any = {};
  forEach(collection, (value) => {
    obj[iteratee(value)] = value;
  });
  return obj;
}
