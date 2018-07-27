/** @private */
export interface ClassFor<T> {
  new(...args: any[]): T;
}

/** @private */

export interface ObjectWith<T> {
  [key: string]: T;
  [index: number]: T;
}

/** @private */
export type Primitive = number | boolean | string;
/** @private */
export type Existant = Primitive | object;
/** @private */
export type Falsey = false | 0 | '' | null | undefined; // | NaN

/** @private */
export type Function0<R> = () => R;
/** @private */
export type Function1<T1, R> = (t1: T1) => R;
/** @private */
export type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
/** @private */
export type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
/** @private */
export type Function4<T1, T2, T3, T4, R> =
  (t1: T1, t2: T2, t3: T3, t4: T4) => R;

/** @private */
export type Transformer<T> = (input: T) => T;

/** @private */
export type ArrayIteratee<I, O> = (item: I, index: number) => O;
/** @private */
export type ObjectIteratee<T, O> = <K extends keyof T>(item: T[K], key: K) => O;
/** @private */
export type ValueIteratee<T, O> = (value: T) => O;
