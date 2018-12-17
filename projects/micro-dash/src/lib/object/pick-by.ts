import {
  NarrowingObjectIteratee, Nil,
  NumberKeyedObject,
  ObjectIteratee,
} from "../interfaces";
import { forOwn } from "./for-own";

/**
 * Creates an object composed of the `object` properties `predicate` returns truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,013 bytes
 * - Micro-dash: 328 bytes
 */

export function pickBy<T>(
  object: T[],
  predicate: ObjectIteratee<T, boolean>,
): T extends Nil ? {} : NumberKeyedObject<T>;

export function pickBy<I, O extends I[keyof I]>(
  object: I,
  predicate: NarrowingObjectIteratee<I, O>,
): Pick<I, { [K in keyof I]: I[K] extends O ? K : never }[keyof I]>;
export function pickBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): T extends Nil ? {} : Partial<T>;

export function pickBy<T>(
  object: T,
  predicate: ObjectIteratee<T, boolean>,
): T extends Nil ? {} : Partial<T> {
  const obj: any = {};
  forOwn(object, (item, key) => {
    if (predicate(item, key)) {
      obj[key] = item;
    }
  });
  return obj;
}
