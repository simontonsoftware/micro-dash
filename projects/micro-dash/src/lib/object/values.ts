import { keys, keysOfNonArray } from "./keys";

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,436 bytes
 * - Micro-dash: 207 bytes
 */
export function values<T>(object: T) {
  return keys(object).map((key) => object[key as keyof T]);
}

/** @hidden */
export function valuesOfNonArray<T>(object: T) {
  return keysOfNonArray(object).map((key) => object[key as keyof T]);
}
