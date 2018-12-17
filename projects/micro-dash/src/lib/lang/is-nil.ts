import { Nil } from "../interfaces";

/**
 * Checks if value is `null` or `undefined`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 74 bytes
 * - Micro-dash: 29 bytes
 */
export function isNil(value: any): value is Nil {
  return value == null;
}
