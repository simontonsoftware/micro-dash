import { ArrayIteratee, ObjectIteratee } from "../interfaces";
import { forEach } from "./for-each";

/**
 * Checks if `predicate` returns truthy for **any** element of `collection`. Iteration is stopped once `predicate` returns truthy.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,355 bytes
 * - Micro-dash: 306 bytes
 */

export function some<T>(
  array: T[] | undefined,
  predicate: ArrayIteratee<T, any>,
): boolean;
export function some<T>(
  object: T | undefined,
  predicate: ObjectIteratee<T, any>,
): boolean;

export function some(collection: any, predicate: any) {
  let none = true;
  forEach(
    collection,
    (item, keyOrIndex) => (none = !predicate(item, keyOrIndex)),
  );
  return !none;
}
