/** @hidden */
export type Nil = null | undefined;
/** @hidden */
export type Primitive = boolean | number | string;
/** @hidden */
export type Key = keyof any;
/** @hidden */
export type Existent = Primitive | object;
/** @hidden */
export type ObjectWith<T> = Record<string, T>;
/** @hidden */
export type StringifiedKey<T> = Cast<keyof T, string>;

/** @hidden */
export type ArrayIteratee<I, O> = (item: I, index: number) => O;
/** @hidden */
export type ArrayNarrowingIteratee<O> = (item: any, index: number) => item is O;
/** @hidden */
export type ObjectIteratee<T, O> = (
  item: T[keyof T],
  key: StringifiedKey<T>,
) => O;
/** @hidden */
export type ValueNarrowingIteratee<I, O> = (
  item: any,
  key: StringifiedKey<I>,
) => item is O;
/** @hidden */
export type KeyNarrowingIteratee<I, O> = (
  item: I[keyof I],
  key: any,
) => key is O;
/** @hidden */
export type ValueIteratee<T, O> = (value: T) => O;

/** @hidden */
export type Cast<I, O> = Exclude<I, O> extends never ? I : O;
/** @hidden */
export type Narrow<I, O> = Extract<I, O> | Extract<O, I>;
/** @hidden */
export type IfCouldBe<T1, T2, If, Else = never> = Extract<T1, T2> extends never
  ? Extract<T2, T1> extends never
    ? Else
    : If
  : If;

/** @hidden */
export type Drop1Arg<T extends Function> = T extends (
  arg1: any,
  ...rest: infer A
) => infer R
  ? (...rest: A) => R
  : never;
/** @hidden */
export type Drop2Args<T extends Function> = T extends (
  arg1: any,
  arg2: any,
  ...rest: infer A
) => infer R
  ? (...rest: A) => R
  : never;
/** @hidden */
export type Drop3Args<T extends Function> = T extends (
  arg1: any,
  arg2: any,
  arg3: any,
  ...rest: infer A
) => infer R
  ? (...rest: A) => R
  : never;
/** @hidden */
export type Drop4Args<T extends Function> = T extends (
  arg1: any,
  arg2: any,
  arg3: any,
  arg4: any,
  ...rest: infer A
) => infer R
  ? (...rest: A) => R
  : never;
