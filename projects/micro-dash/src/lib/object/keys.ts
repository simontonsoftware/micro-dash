/**
 * Creates an array of the own enumerable property names of object.
 *
 * Differences from lodash:
 *
 * Contribution to minified bundle size, when it is the only function imported:
 */
export function keys<T>(object: T): Array<keyof T> {
  return Object.getOwnPropertyNames(object) as Array<keyof T>;
}
