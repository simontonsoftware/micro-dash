import { PickByValue } from "utility-types";
import {
  KeyNarrowingIteratee,
  ValueNarrowingIteratee,
  Nil,
  ObjectIteratee,
  StringifiedKey,
} from "../interfaces";
import { forOwn } from "./for-own";

/**
 * Creates an object composed of the `object` properties `predicate` returns truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,179 bytes
 * - Micro-dash: 350 bytes
 */

export function pickBy<T, O extends T>(
  object: T[] | Nil,
  predicate: ValueNarrowingIteratee<T[], O>,
): { [index: number]: O };
export function pickBy<T>(
  object: T[] | Nil,
  predicate: ObjectIteratee<T, boolean>,
): { [index: number]: T };

export function pickBy<I, T extends NonNullable<I>, O extends T[keyof T]>(
  object: I,
  predicate: ValueNarrowingIteratee<T, O>,
): PickByValue<T, O> | (Extract<I, Nil> extends never ? never : {});
export function pickBy<
  I,
  T extends NonNullable<I>,
  O extends StringifiedKey<T>
>(
  object: I,
  predicate: KeyNarrowingIteratee<T, O>,
):
  | { [K in Extract<keyof T, O>]: T[K] }
  | (Extract<I, Nil> extends never ? never : {});
export function pickBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): Partial<NonNullable<T>>;

export function pickBy<T>(object: T, predicate: ObjectIteratee<T, boolean>) {
  const obj: any = {};
  forOwn(object, (item, key) => {
    if (predicate(item, key)) {
      obj[key] = item;
    }
  });
  return obj;
}
