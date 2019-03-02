/** @hidden */
export interface ClassFor<T> {
  new (...args: unknown[]): T;
}

/** @hidden */
export type ObjectWith<T> = Record<string, T>;

/** @hidden */
export interface NumberKeyedObject<T = unknown> {
  [key: number]: T;
}

/** @hidden */
export type Primitive = number | boolean | string;
/** @hidden */
export type Existant = Primitive | object;
/** @hidden */
export type Nil = null | undefined;
/** @hidden */
export type Falsey = Nil | false | 0 | ""; // | NaN

/** @hidden */
export type Function0<R> = () => R;
/** @hidden */
export type Function1<T1, R> = (t1: T1) => R;
/** @hidden */
export type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
/** @hidden */
export type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
/** @hidden */
export type Function4<T1, T2, T3, T4, R> = (
  t1: T1,
  t2: T2,
  t3: T3,
  t4: T4,
) => R;

/** @hidden */
export type Transformer<T> = (input: T) => T;

/** @hidden */
export type ArrayIteratee<I, O> = (item: I, index: number) => O;
/** @hidden */
export type NarrowingArrayIteratee<I, O extends I> = (
  item: I,
  index: number,
) => item is O;
/** @hidden */
export type ObjectIteratee<T, O> = <K extends keyof T>(
  item: T[K],
  key: T extends NumberKeyedObject ? string : K,
) => O;
/** @hidden */
export type NarrowingObjectIteratee<I, O extends I[keyof I]> = (
  item: I[keyof I],
  key: I extends NumberKeyedObject ? string : keyof I,
) => item is O;
// export type ObjectIteratee<T, O> = (item: T[keyof T], key: string) => O;
/** @hidden */
export type ValueIteratee<T, O> = (value: T) => O;
