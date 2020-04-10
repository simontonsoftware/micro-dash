import { Nil, StringifiedKey } from "../interfaces";

/**
 * Creates an array of the own enumerable property names of object.
 *
 * Differences from lodash:
 * - does not give any special consideration for arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,308 bytes
 * - Micro-dash: 148 bytes
 */

export function keys<T>(object: T | Nil): Array<StringifiedKey<T>> {
  let val = keysOfNonArray(object);
  if (Array.isArray(object)) {
    val = val.filter((item) => item !== "length");
  }
  return val as any;
}

/** @hidden */
export function keysOfNonArray<T>(object: T | Nil): Array<StringifiedKey<T>> {
  let val: string[] = [];
  if (object) {
    val = Object.getOwnPropertyNames(object);
  }
  return val as any;
}
