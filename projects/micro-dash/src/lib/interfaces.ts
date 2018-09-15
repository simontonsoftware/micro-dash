/** @hidden */
export interface ClassFor<T> {
  new (...args: any[]): T;
}

/** @hidden */
export interface ObjectWith<T> {
  [key: string]: T;
}

/** @hidden */
export type DeepPartial<T> = { [K in keyof T]?: DeepPartial<T[K]> };

/** @hidden */
export interface NumberKeyedObject {
  [key: number]: any;
}

/** @hidden */
export type Primitive = number | boolean | string;
/** @hidden */
export type Existant = Primitive | object;
/** @hidden */
export type Falsey = false | 0 | "" | null | undefined; // | NaN

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
export type ObjectIteratee<T, O> = <K extends keyof T>(
  item: T[K],
  key: T extends NumberKeyedObject ? string : K,
) => O;
// export type ObjectIteratee<T, O> = (item: T[keyof T], key: string) => O;
/** @hidden */
export type ValueIteratee<T, O> = (value: T) => O;
