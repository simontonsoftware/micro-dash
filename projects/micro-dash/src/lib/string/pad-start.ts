import { makePadding } from "./pad";

/**
 * Pads `string` on the left side if it's shorter than `length`. Padding characters are truncated if they exceed `length`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,308 bytes
 * - Micro-dash: 161 bytes
 */
export function padStart(s: string, length: number, chars = " ") {
  return makePadding(s, length, chars) + s;
}
