import { makePadding } from "./pad";

/**
 * Pads `string` on the right side if it's shorter than `length`. Padding characters are truncated if they exceed `length`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,417 bytes
 * - Micro-dash: 180 bytes
 */
export function padEnd(s: string, length: number, chars = " ") {
  return s + makePadding(s, length, chars);
}
