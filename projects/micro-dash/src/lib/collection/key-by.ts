import { Key, Nil, ValueIteratee } from "../interfaces";
import { forEach } from "./for-each";

/**
 * Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The corresponding value of each key is the last element responsible for generating the key.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,724 bytes
 * - Micro-dash: 429 bytes
 */

export function keyBy<T, K extends Key>(
  array: T[] | Nil,
  iteratee: ValueIteratee<T, K>,
): { [key in K]?: T };
export function keyBy<T, K extends Key>(
  object: T,
  iteratee: ValueIteratee<T[keyof T], K>,
): { [key in K]?: T[keyof T] };

export function keyBy(collection: any, iteratee: Function) {
  const obj: any = {};
  forEach(collection, (value) => {
    obj[iteratee(value)] = value;
  });
  return obj;
}
