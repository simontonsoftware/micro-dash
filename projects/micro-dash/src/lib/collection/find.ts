import {
  ArrayIteratee,
  ArrayNarrowingIteratee,
  Cast,
  IfCouldBe,
  IfHasIndexKey,
  KeyNarrowingIteratee,
  Nil,
  ObjectIteratee,
  StringifiedKey,
  ValueNarrowingIteratee,
} from "../interfaces";
import { keysOfNonArray } from "../object/keys";

/**
 * Iterates over elements of `collection`, returning the first element `predicate` returns truthy for.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,881 bytes
 * - Micro-dash: 383 bytes
 */

export function find<I, O>(
  array: I[] | Nil,
  predicate: ArrayNarrowingIteratee<O>,
  fromIndex?: number,
): Extract<I, O> | Extract<O, I> | undefined;
export function find<T>(
  array: T[] | Nil,
  predicate: ArrayIteratee<T, boolean>,
  fromIndex?: number,
): T | undefined;

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
  | {
      [K in keyof T]: T[K] extends O
        ? T[K]
        : IfCouldBe<T[K], O, Extract<T[K], O> | Extract<O, T[K]> | undefined>
    }[keyof T]
  | IfCouldBe<T[keyof T], O, never, undefined>
  | IfCouldBe<I, Nil, undefined>
  | IfCouldBe<F, number, undefined>;
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
  | { [K in keyof T]: IfCouldBe<Cast<K, string>, O, T[K]> }[keyof T]
  | IfCouldBe<I, Nil, undefined>
  | IfCouldBe<StringifiedKey<T>, O, never, undefined>
  | IfCouldBe<F, number, undefined>
  | IfHasIndexKey<T, undefined>;

export function find<T>(
  object: T | Nil,
  predicate: ObjectIteratee<T, boolean>,
  fromIndex?: number,
): T[keyof T] | undefined;

export function find(collection: any, predicate: Function, fromIndex = 0) {
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
