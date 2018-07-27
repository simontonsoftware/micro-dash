import { partial } from './partial';

// type definitions from @types/lodash

/** @private */
export interface CurriedFunction1<T1, R> {
  (): CurriedFunction1<T1, R>;
  (t1: T1): R;
}
/** @private */
export interface CurriedFunction2<T1, T2, R> {
  (): CurriedFunction2<T1, T2, R>;
  (t1: T1): CurriedFunction1<T2, R>;
  (t1: T1, t2: T2): R;
}
/** @private */
export interface CurriedFunction3<T1, T2, T3, R> {
  (): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: T2): CurriedFunction1<T3, R>;
  (t1: T1, t2: T2, t3: T3): R;
}
/** @private */
export interface CurriedFunction4<T1, T2, T3, T4, R> {
  (): CurriedFunction4<T1, T2, T3, T4, R>;
  (t1: T1): CurriedFunction3<T2, T3, T4, R>;
  (t1: T1, t2: T2): CurriedFunction2<T3, T4, R>;
  (t1: T1, t2: T2, t3: T3): CurriedFunction1<T4, R>;
  (t1: T1, t2: T2, t3: T3, t4: T4): R;
}

/**
 * Creates a function that accepts arguments of `func` and either invokes func returning its result, if at least `arity` number of arguments have been provided, or returns a function that accepts the remaining `func` arguments, and so on. The `arity` of func may be specified if `func.length` is not sufficient.
 *
 * Differences from lodash:
 * - there is no "placeholder" functionality
 * - it will return plain functions; they will not inherit the prototype of `func`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 9,084 bytes
 * - Micro-dash: 299 bytes
 */

export function curry<T1, R>(func: (t1: T1) => R): CurriedFunction1<T1, R>;
export function curry<T1, R>(
  func: (t1: T1, ...more: any[]) => R,
  arity: 1,
): CurriedFunction1<T1, R>;
export function curry<T1, T2, R>(
  func: (t1: T1, t2: T2) => R,
): CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, R>(
  func: (t1: T1, t2: T2, ...more: any[]) => R,
  arity: 2,
): CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(
  func: (t1: T1, t2: T2, t3: T3) => R,
): CurriedFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, R>(
  func: (t1: T1, t2: T2, t3: T3, ...more: any[]) => R,
  arity: 3,
): CurriedFunction3<T1, T2, T3, R>;
export function curry<T1, T2, T3, T4, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4) => R,
): CurriedFunction4<T1, T2, T3, T4, R>;
export function curry<T1, T2, T3, T4, R>(
  func: (t1: T1, t2: T2, t3: T3, t4: T4, ...more: any[]) => R,
  arity: 4,
): CurriedFunction4<T1, T2, T3, T4, R>;

export function curry(func: (...args: any[]) => any, arity = func.length) {
  return function(this: any, ...args: any[]) {
    if (args.length < arity) {
      return curry(partial(func, ...args), (arity - args.length) as any);
    } else {
      return func.apply(this, args);
    }
  };
}
