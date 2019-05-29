import { Transformer } from "../interfaces";
import { identity } from "./identity";

/**
 * Creates a function that returns the result of invoking the given functions with the `this` binding of the created function, where each successive invocation is supplied the return value of the previous.
 *
 * Differences from lodash:
 * - does not accept an arrays of functions
 * - all functions will be given only 1 argument (in lodash the first one called can take multiple)
 * - might not construct a new function when it is not needed
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,005 bytes
 * - Micro-dash: 172 bytes
 */

// types are from DefinitelyTyped/lodash

// 0-argument first function
export function flow<R1, R2>(f1: () => R1, f2: (a: R1) => R2): () => R2;
export function flow<R1, R2, R3>(
  f1: () => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
): () => R3;
export function flow<R1, R2, R3, R4>(
  f1: () => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
): () => R4;
export function flow<R1, R2, R3, R4, R5>(
  f1: () => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
): () => R5;
export function flow<R1, R2, R3, R4, R5, R6>(
  f1: () => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
): () => R6;
export function flow<R1, R2, R3, R4, R5, R6, R7>(
  f1: () => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7,
): () => R7;

// 1-argument first function
export function flow<A1, R1, R2>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
): (a1: A1) => R2;
export function flow<A1, R1, R2, R3>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
): (a1: A1) => R3;
export function flow<A1, R1, R2, R3, R4>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
): (a1: A1) => R4;
export function flow<A1, R1, R2, R3, R4, R5>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
): (a1: A1) => R5;
export function flow<A1, R1, R2, R3, R4, R5, R6>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
): (a1: A1) => R6;
export function flow<A1, R1, R2, R3, R4, R5, R6, R7>(
  f1: (a1: A1) => R1,
  f2: (a: R1) => R2,
  f3: (a: R2) => R3,
  f4: (a: R3) => R4,
  f5: (a: R4) => R5,
  f6: (a: R5) => R6,
  f7: (a: R6) => R7,
): (a1: A1) => R7;

// generic function
// export function flow<TResult extends Function>(...funcs: Function[]): TResult;
// export function flow<TResult extends Function>(funcs: Function[]): TResult;

export function flow<T>(...funcs: Array<Transformer<T>>): Transformer<T>;

export function flow(...funcs: Function[]) {
  if (funcs.length) {
    return funcs.reduce((result, func) => (input: unknown) =>
      func(result(input)),
    );
  } else {
    return identity;
  }
}
