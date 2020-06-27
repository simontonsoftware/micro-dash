import { isString, toArray } from '../lang';

/**
 * Checks if `value` is in `collection`. If `collection` is a string, it's checked for a substring of `value`. If `fromIndex` is negative, it's used as the offset from the end of `collection`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,547 bytes
 * - Micro-dash: 269 bytes
 */
export function includes<T extends any[] | object | string>(
  collection: T,
  value: T extends any[] ? T[0] : T extends string ? string : T[keyof T],
  fromIndex = 0,
): boolean {
  if (isString(collection)) {
    if (fromIndex > collection.length) {
      return false;
    }
  } else {
    collection = toArray(collection) as any;
  }
  return (collection as any).includes(value, fromIndex);
}
