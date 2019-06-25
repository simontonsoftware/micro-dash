import { ObjectWith } from "../interfaces";
import { forEachRight } from "./for-each-right";
import { doReduce } from "./reduce-utils";

/**
 * This method is like `_.reduce` except that it iterates over elements of `collection` from right to left.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,524 bytes
 * - Micro-dash: 344 bytes
 */
export function reduceRight<E>(
  array: E[] | undefined,
  iteratee: (accumulator: E, value: E, index: number) => E,
): E;
export function reduceRight<E, A>(
  array: E[] | undefined,
  iteratee: (accumulator: A, value: E, index: number) => A,
  accumulator: A,
): A;
export function reduceRight<E>(
  array: ObjectWith<E> | undefined,
  iteratee: (accumulator: E, value: E, key: keyof E) => E,
): E;
export function reduceRight<E, A>(
  array: ObjectWith<E> | undefined,
  iteratee: (accumulator: A, value: E, key: keyof E) => A,
  accumulator: A,
): A;
export function reduceRight(
  collection: any,
  iteratee: Function,
  accumulator?: any,
) {
  return doReduce(
    forEachRight,
    collection,
    iteratee,
    accumulator,
    arguments.length < 3,
  );
}
