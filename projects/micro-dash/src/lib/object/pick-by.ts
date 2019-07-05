import { NarrowingObjectIteratee, Nil, ObjectIteratee } from "../interfaces";
import { forOwnExceptArrayLength } from "./_keys-except-array-length";

/**
 * Creates an object composed of the `object` properties `predicate` returns truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,179 bytes
 * - Micro-dash: 355 bytes
 */

export function pickBy<T>(
  object: T[],
  predicate: ObjectIteratee<T, boolean>,
): T extends Nil ? {} : { [index: number]: T };

export function pickBy<I, O extends I[keyof I]>(
  object: I,
  predicate: NarrowingObjectIteratee<I, O>,
): Pick<I, { [K in keyof I]: I[K] extends O ? K : never }[keyof I]>;
export function pickBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): T extends Nil ? {} : Partial<T>;

export function pickBy<T>(object: T, predicate: ObjectIteratee<T, boolean>) {
  const obj: any = {};
  forOwnExceptArrayLength(object, (item, key) => {
    if (predicate(item, key)) {
      obj[key] = item;
    }
  });
  return obj;
}
