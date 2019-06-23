import { values } from "../object";

/**
 * Converts `value` to an array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,042 bytes
 * - Micro-dash: 171 bytes
 */
export function toArray(value: any) {
  if (value && value[Symbol.iterator]) {
    return Array.from(value);
  } else {
    return values(value);
  }
}
