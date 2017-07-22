import {partial} from './partial';

// type definitions from @types/lodash

export interface CurriedFunction1<T1, R> {
  (): CurriedFunction1<T1, R>;
  (t1: T1): R;
}
export interface CurriedFunction2<T1, T2, R> {
  (): CurriedFunction2<T1, T2, R>;
  (t1: T1): CurriedFunction1<T2, R>;
  (t1: T1, t2: T2): R;
}
export interface CurriedFunction3<T1, T2, T3, R> {
  (): CurriedFunction3<T1, T2, T3, R>;
  (t1: T1): CurriedFunction2<T2, T3, R>;
  (t1: T1, t2: T2): CurriedFunction1<T3, R>;
  (t1: T1, t2: T2, t3: T3): R;
}

export function curry<T1, R>(func: (t1: T1) => R): CurriedFunction1<T1, R>;
export function curry<T1, T2, R>(
  func: (t1: T1, t2: T2) => R,
): CurriedFunction2<T1, T2, R>;
export function curry<T1, T2, T3, R>(
  func: (t1: T1, t2: T2, t3: T3) => R,
): CurriedFunction3<T1, T2, T3, R>;

export function curry(func: (...args: any[]) => any) {
  return (...args: any[]) => {
    if (args.length < func.length) {
      return curry(partial(func, ...args));
    } else {
      return func(...args);
    }
  };
}
