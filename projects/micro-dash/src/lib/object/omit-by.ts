import {
  Cast,
  IfCouldBe,
  KeyNarrowingIteratee,
  Nil,
  ObjectIteratee,
  ValueNarrowingIteratee,
} from "../interfaces";
import { pickBy } from "./pick-by";

/**
 * The opposite of `pickBy`; this method creates an object composed of the own enumerable string keyed properties of `object` that `predicate` doesn't return truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,529 bytes
 * - Micro-dash: 407 bytes
 */

export function omitBy<T, O>(
  object: T[] | Nil,
  predicate: ValueNarrowingIteratee<T[], O>,
): { [index: number]: Exclude<T, O> };
export function omitBy<T>(
  object: T[] | Nil,
  predicate: ObjectIteratee<T, boolean>,
): { [index: number]: T };

export function omitBy<I, T extends NonNullable<I>, O>(
  object: I,
  predicate: ValueNarrowingIteratee<T, O>,
):
  | {
      [K in {
        [KK in keyof T]: T[KK] extends O ? never : KK;
      }[keyof T]]: IfCouldBe<T[K], O, Exclude<T[K], O> | undefined, T[K]>;
    }
  | IfCouldBe<I, Nil, {}>;
export function omitBy<I, T extends NonNullable<I>, O>(
  object: I,
  predicate: KeyNarrowingIteratee<T, O>,
):
  | {
      [K in {
        [KK in keyof T]: Cast<KK, string> extends O ? never : KK;
      }[keyof T]]: T[K] | IfCouldBe<Cast<K, string>, O, undefined>;
    }
  | IfCouldBe<I, Nil, {}>;
export function omitBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): Partial<NonNullable<T>>;

export function omitBy(object: any, predicate: Function) {
  return pickBy(object, (item, key) => !predicate(item, key));
}
