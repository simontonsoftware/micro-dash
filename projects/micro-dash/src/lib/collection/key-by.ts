import { ObjectWith, ValueIteratee } from "../interfaces";
import { forEach } from "./for-each";

/**
 * Creates an object composed of keys generated from the results of running each element of `collection` thru `iteratee`. The corresponding value of each key is the last element responsible for generating the key.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,543 bytes
 * - Micro-dash: 412 bytes
 */

export function keyBy<T>(
  array: T[] | undefined,
  iteratee: ValueIteratee<T, string>,
): ObjectWith<T>;
export function keyBy<T>(
  object: ObjectWith<T> | undefined,
  iteratee: ValueIteratee<T, string>,
): ObjectWith<T>;

export function keyBy<T>(collection: any, iteratee: any) {
  const obj: ObjectWith<T> = {};
  forEach(collection, (value: T) => {
    obj[iteratee(value)] = value;
  });
  return obj;
}
