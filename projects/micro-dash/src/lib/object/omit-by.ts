import { PickByValue } from "utility-types";
import {
  KeyNarrowingIteratee,
  ValueNarrowingIteratee,
  Nil,
  ObjectIteratee,
  StringifiedKey,
} from "../interfaces";
import { pickBy } from "./pick-by";

/**
 * The opposite of `omitBy`; this method creates an object composed of the own enumerable string keyed properties of `object` that `predicate` doesn't return truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,529 bytes
 * - Micro-dash: 407 bytes
 */

export function omitBy<T, O extends T>(
  object: T[] | Nil,
  predicate: ValueNarrowingIteratee<T[], O>,
): { [index: number]: Exclude<T, O> };
export function omitBy<T>(
  object: T[] | Nil,
  predicate: ObjectIteratee<T, boolean>,
): { [index: number]: T };

export function omitBy<I, T extends NonNullable<I>, O extends T[keyof T]>(
  object: I,
  predicate: ValueNarrowingIteratee<T, O>,
):
  | PickByValue<T, Exclude<T[keyof T], O>>
  | (Extract<I, Nil> extends never ? never : {});
export function omitBy<
  I,
  T extends NonNullable<I>,
  O extends StringifiedKey<T>
>(
  object: I,
  predicate: KeyNarrowingIteratee<T, O>,
):
  | { [K in Exclude<keyof T, O>]: T[K] }
  | (Extract<I, Nil> extends never ? never : {});
export function omitBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): Partial<NonNullable<T>>;

export function omitBy(object: any, predicate: Function) {
  return pickBy(object, (item, key) => !predicate(item, key));
}
