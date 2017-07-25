import {forEach} from './for-each';
import {ObjectWith} from '../interfaces';
import {forEachRight} from './for-each-right';

/**
 * Reduces `collection` to a value which is the accumulated result of running each element in collection thru `iteratee`, where each successive invocation is supplied the return value of the previous. If accumulator is not given, the first element of collection is used as the initial value.
 *
 * Differences from lodash:
 * - does not pass `collection` to `iteratee`
 * - does not iterate "array-like" objects as arrays
 * - does not support iteratee shorthand; `iteratee` must be a function
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,600 bytes
 * - Micro-dash: 309 bytes
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
    forEach, collection, iteratee, accumulator, arguments.length < 3,
  );
}

/**
 * This method is like `_.reduce` except that it iterates over elements of `collection` from right to left.
 *
 * Differences from lodash:
 * - does not pass `collection` to `iteratee`
 * - does not iterate "array-like" objects as arrays
 * - does not support iteratee shorthand; `iteratee` must be a function
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,598 bytes
 * - Micro-dash: 299 bytes
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
  collection: any, iteratee: any, accumulator?: any,
) {
  return doReduce(
    forEachRight, collection, iteratee, accumulator, arguments.length < 3,
  );
}

function doReduce(
  iterationFn: any,
  collection: any,
  iteratee: any,
  accumulator: any,
  initAccum: boolean,
) {
  iterationFn(collection, (value: any, indexOrKey: any) => {
    if (initAccum) {
      accumulator = value;
      initAccum = false;
    } else {
      accumulator = iteratee(accumulator, value, indexOrKey);
    }
  });
  return accumulator;
}
