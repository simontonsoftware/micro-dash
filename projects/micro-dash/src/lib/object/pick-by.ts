import {
  Cast,
  IfCouldBe,
  KeyNarrowingIteratee,
  Nil,
  ObjectIteratee,
  ValueNarrowingIteratee,
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

export function pickBy<T, O>(
  object: T[] | Nil,
  predicate: ValueNarrowingIteratee<T[], O>,
): { [index: number]: Extract<T, O> | Extract<O, T> };
export function pickBy<T>(
  object: T[] | Nil,
  predicate: ObjectIteratee<T, boolean>,
): { [index: number]: T };

export function pickBy<I, T extends NonNullable<I>, O>(
  object: I,
  predicate: ValueNarrowingIteratee<T, O>,
):
  | {
      [K in { [KK in keyof T]: IfCouldBe<T[KK], O, KK> }[keyof T]]:
        | Extract<T[K], O>
        | Extract<O, T[K]>
        | (Exclude<T[K], O> extends never ? never : undefined);
    }
  | IfCouldBe<I, Nil, {}>;
export function pickBy<I, T extends NonNullable<I>, O>(
  object: I,
  predicate: KeyNarrowingIteratee<T, O>,
):
  | {
      [K in { [KK in keyof T]: IfCouldBe<Cast<KK, string>, O, KK> }[keyof T]]:
        | T[K]
        | (Cast<K, string> extends O ? never : undefined);
    }
  | IfCouldBe<I, Nil, {}>;
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
