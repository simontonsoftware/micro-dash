import { ObjectWith } from "../interfaces";
import { forEach } from "./for-each";
import { doReduce } from "./reduce-utils";

/**
 * Reduces `collection` to a value which is the accumulated result of running each element in collection thru `iteratee`, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element of collection is used as the initial value.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,164 bytes
 * - Micro-dash: 345 bytes
 */
export function reduce<E>(
  array: E[] | undefined,
  iteratee: (accumulator: E, value: E, index: number) => E,
): E;
export function reduce<E, A>(
  array: E[] | undefined,
  iteratee: (accumulator: A, value: E, index: number) => A,
  accumulator?: A,
): A;
export function reduce<E>(
  array: ObjectWith<E> | undefined,
  iteratee: (accumulator: E, value: E, key: keyof E) => E,
): E;
export function reduce<E, A>(
  array: ObjectWith<E> | undefined,
  iteratee: (accumulator: A, value: E, key: keyof E) => A,
  accumulator: A,
): A;
export function reduce(collection: any, iteratee: any, accumulator?: any) {
  return doReduce(
    forEach,
    collection,
    iteratee,
    accumulator,
    arguments.length < 3,
  );
}
