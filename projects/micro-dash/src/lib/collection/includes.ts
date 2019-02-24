import { isString } from "../lang";
import { values } from "../object";

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's checked for a substring of `value`, otherwise `SameValueZero` is used for equality comparisons. If `fromIndex` is negative, it's used as the offset from the end of `collection`.
 *
 * ```ts
 * includes([1, 2, 3], 1); // true
 * includes([1, 2, 3], 1, 2); // false
 * includes({ a: 1, b: 2 }, 1); // true
 * includes('abcd', 'bc'); // true
 * ```
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,514 bytes
 * - Micro-dash: 210 bytes
 */
export function includes<T extends any[] | object | string>(
  collection: T,
  value: T extends any[] ? T[0] : T extends string ? string : T[keyof T],
  fromIndex = 0,
) {
  return ((isString(collection) || Array.isArray(collection)
    ? collection
    : values(collection)) as any).includes(value, fromIndex);
}
