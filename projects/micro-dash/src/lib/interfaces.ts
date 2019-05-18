import { NumberKeyedObject } from "s-ng-dev-utils";

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
/** @hidden */
export type ValueIteratee<T, O> = (value: T) => O;

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
