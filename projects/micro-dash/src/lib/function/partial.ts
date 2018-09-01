import {
  Function0,
  Function1,
  Function2,
  Function3,
  Function4,
} from "../interfaces";

// type definitions from @types/lodash

/**
 * Creates a function that invokes `func` with `partials` prepended to the arguments it receives. This method is like `bind` except it does not alter the `this` binding.
 *
 * Differences from lodash:
 * - there is no "placeholder" functionality
 * - sets the "length" property of partially applied functions
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 9,221 bytes
 * - Micro-dash: 108 bytes
 */

// arity 1
export function partial<T1, R>(func: Function1<T1, R>, arg1: T1): Function0<R>;

// arity 2
export function partial<T1, T2, R>(
  func: Function2<T1, T2, R>,
  arg1: T1,
): Function1<T2, R>;
export function partial<T1, T2, R>(
  func: Function2<T1, T2, R>,
  arg1: T1,
  arg2: T2,
): Function0<R>;

// arity 3
export function partial<T1, T2, T3, R>(
  func: Function3<T1, T2, T3, R>,
  arg1: T1,
): Function2<T2, T3, R>;
export function partial<T1, T2, T3, R>(
  func: Function3<T1, T2, T3, R>,
  arg1: T1,
  arg2: T2,
): Function1<T3, R>;
export function partial<T1, T2, T3, R>(
  func: Function3<T1, T2, T3, R>,
  arg1: T1,
  arg2: T2,
  arg3: T3,
): Function0<R>;

// arity 4
export function partial<T1, T2, T3, T4, R>(
  func: Function4<T1, T2, T3, T4, R>,
  arg1: T1,
): Function3<T2, T3, T4, R>;
export function partial<T1, T2, T3, T4, R>(
  func: Function4<T1, T2, T3, T4, R>,
  arg1: T1,
  arg2: T2,
): Function2<T3, T4, R>;
export function partial<T1, T2, T3, T4, R>(
  func: Function4<T1, T2, T3, T4, R>,
  arg1: T1,
  arg2: T2,
  arg3: T3,
): Function1<T4, R>;
export function partial<T1, T2, T3, T4, R>(
  func: Function4<T1, T2, T3, T4, R>,
  arg1: T1,
  arg2: T2,
  arg3: T3,
  arg4: T4,
): Function0<R>;

// catch-all
export function partial<R>(
  func: (...args: any[]) => R,
  ...args: any[]
): (...args: any[]) => R;

export function partial(func: Function, ...partials: any[]) {
  return func.bind(undefined, ...partials);
}
