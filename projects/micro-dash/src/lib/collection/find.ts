import {
  ArrayIteratee,
  ArrayNarrowingIteratee,
  Cast,
  IfCouldBe,
  KeyNarrowingIteratee,
  Narrow,
  Nil,
  ObjectIteratee,
  ValueNarrowingIteratee,
} from '../interfaces';
import { keysOfNonArray } from '../object/keys';

/** @hidden */
type DefiniteValueMatches<T, O> = {
  [K in keyof T]: T[K] extends O ? T[K] : never;
}[keyof T];
/** @hidden */
type PossibleValueMatches<T, O> = {
  [K in keyof T]: IfCouldBe<T[K], O, Narrow<T[K], O>>;
}[keyof T];

/** @hidden */
type DefiniteKeyMatches<T, O> = {
  [K in keyof T]: Cast<K, string> extends O ? T[K] : never;
}[keyof T];
/** @hidden */
type PossibleKeyMatches<T, O> = {
  [K in keyof T]: IfCouldBe<Cast<K, string>, O, T[K]>;
}[keyof T];

/**
 * Iterates over elements of `collection`, returning the first element `predicate` returns truthy for.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,507 bytes
 * - Micro-dash: 207 bytes
 */

// array: value narrowing
export function find<I, O>(
  array: I[] | Nil,
  predicate: ArrayNarrowingIteratee<O>,
  fromIndex?: number,
): Extract<I, O> | Extract<O, I> | undefined;

// array
export function find<T>(
  array: T[] | Nil,
  predicate: ArrayIteratee<T, boolean>,
  fromIndex?: number,
): T | undefined;

// object: value narrowing
export function find<
  I,
  T extends NonNullable<I>,
  O,
  F extends number | undefined = undefined
>(
  object: I,
  predicate: ValueNarrowingIteratee<T, O>,
  fromIndex?: F,
):
  | PossibleValueMatches<T, O>
  | (DefiniteValueMatches<T, O> extends never ? undefined : never)
  | IfCouldBe<I, Nil, undefined>
  | IfCouldBe<F, number, undefined>;

// object: key narrowing
export function find<
  I,
  T extends NonNullable<I>,
  O,
  F extends number | undefined = undefined
>(
  object: I,
  predicate: KeyNarrowingIteratee<T, O>,
  fromIndex?: F,
):
  | PossibleKeyMatches<T, O>
  | (DefiniteKeyMatches<T, O> extends never ? undefined : never)
  | IfCouldBe<I, Nil, undefined>
  | IfCouldBe<F, number, undefined>;

// object
export function find<T>(
  object: T | Nil,
  predicate: ObjectIteratee<T, boolean>,
  fromIndex?: number,
): T[keyof T] | undefined;

export function find(collection: any, predicate: Function, fromIndex = 0): any {
  if (Array.isArray(collection)) {
    return collection
      .slice(fromIndex)
      .find((item, index) => predicate(item, index));
  } else {
    for (const key of keysOfNonArray(collection).slice(fromIndex)) {
      const item = collection[key];
      if (predicate(item, key)) {
        return item;
      }
    }
  }
}
