import { keysOfNonArray } from "../object/keys";

/**
 * Performs a deep comparison between two values to determine if they are equivalent.
 *
 * Differences from lodash:
 * - cannot handle circular references
 * - does not give special treatment to arrays; their own properties are compared just like other objects. Note this means sparse arrays are not equal to their dense "equivalents".
 * - `isEqual(0, -0) === false`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 10,899 bytes
 * - Micro-dash: 572 bytes
 */
export function isEqual(value: any, other: any) {
  if (Object.is(value, other)) {
    // covers e.g. NaN === NaN
    return true;
  }
  if (!(value instanceof Object && other instanceof Object)) {
    return false;
  }
  for (const key of keysOfNonArray(value)) {
    if (!other.hasOwnProperty(key)) {
      return false;
    }
  }
  for (const key of keysOfNonArray(other)) {
    if (!isEqual(value[key], other[key])) {
      return false;
    }
  }
  return true;
}
