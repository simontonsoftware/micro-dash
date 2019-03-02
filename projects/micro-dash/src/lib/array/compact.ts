import { Falsey } from "../interfaces";
import { identity } from "../util/identity";

/**
 * Creates an array with all falsey values removed. The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 97 bytes
 * - Micro-dash: 36 bytes
 */
export function compact<T>(array: Array<T>) {
  return array.filter(identity) as Array<Exclude<T, Falsey>>;
}
