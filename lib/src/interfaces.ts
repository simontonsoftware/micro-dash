export interface ClassFor<T> {new(...args: any[]): T; }

export interface ObjectWith<T> {[key: string]: T; }

export type Primitive = number | boolean | string;
export type Existant = Primitive | object;
export type Falsey = false | 0 | '' | null | undefined; // | NaN

export type Function0<R> = () => R;
export type Function1<T1, R> = (t1: T1) => R;
export type Function2<T1, T2, R> = (t1: T1, t2: T2) => R;
export type Function3<T1, T2, T3, R> = (t1: T1, t2: T2, t3: T3) => R;
export type Function4<T1, T2, T3, T4, R> =
  (t1: T1, t2: T2, t3: T3, t4: T4) => R;

export type Transformer<T> = (input: T) => T;

export type ArrayIteratee<I, O> = (item: I, index: number) => O;
export type ObjectIteratee<I, O> = (item: I, key: string) => O;
