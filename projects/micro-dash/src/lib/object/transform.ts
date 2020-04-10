import { forEach } from "../collection";
import { ObjectWith } from "../interfaces";

/**
 * An alternative to `reduce`; this method transforms `object` to a new `accumulator` object which is the result of running each of its own enumerable string keyed properties thru `iteratee`, with each invocation potentially mutating the `accumulator` object. If `accumulator` is not provided, a new plain object (`{}`) will be used. Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * Differences from lodash:
 * - the default accumulator will not have any special prototype, it will simply be `{}`
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,219 bytes
 * - Micro-dash: 257 bytes
 */

export function transform<E, A>(
  array: E[] | undefined,
  iteratee: (accumulator: A, value: E, index: number) => void | boolean,
  accumulator?: A,
): A;
export function transform<E, A>(
  object: ObjectWith<E> | undefined,
  iteratee: (accumulator: A, value: E, key: string) => void | boolean,
  accumulator?: A,
): A;

export function transform(object: any, iteratee: Function, accumulator = {}) {
  forEach(object, (value, key) => iteratee(accumulator, value, key));
  return accumulator;
}
