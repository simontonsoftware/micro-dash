/**
 * Creates an array of the own enumerable property names of object.
 *
 * Differences from lodash:
 * - does not give any special consideration for arrays, arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 */
export function keys<T>(
  object: T,
): Array<number extends keyof T ? string : keyof T> {
  if (object) {
    return Object.getOwnPropertyNames(object) as Array<
      number extends keyof T ? string : keyof T
    >;
  } else {
    return [];
  }
}
