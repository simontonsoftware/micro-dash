import { keys } from "../object/keys";

/**
 * Checks if `value` is an empty object or collection.
 *
 * Objects are considered empty if they have no own enumerable string keyed properties.
 *
 * Arrays are considered empty if they have a `length` of `0`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,315 bytes
 * - Micro-dash: 114 bytes
 */
export function isEmpty(value: any) {
  if (!Array.isArray(value)) {
    value = keys(value);
  }
  return value.length === 0;
}
