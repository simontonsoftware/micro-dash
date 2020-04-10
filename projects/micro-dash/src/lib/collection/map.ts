import { ArrayIteratee, ObjectIteratee } from "../interfaces";
import { forEach } from "./for-each";

/**
 * Creates an array of values by running each element in `collection` thru `iteratee`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,020 bytes
 * - Micro-dash: 274 bytes
 */

export function map<I, O>(
  array: I[] | undefined,
  iteratee: ArrayIteratee<I, O>,
): O[];
export function map<T, O>(
  object: T | undefined,
  iteratee: ObjectIteratee<T, O>,
): O[];

export function map(collection: any, iteratee: any) {
  const mapped: any[] = [];
  forEach(collection, (value, keyOrIndex) => {
    mapped.push(iteratee(value, keyOrIndex));
  });
  return mapped;
}
