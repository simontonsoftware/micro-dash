/**
 * Checks if `n` is between `start` and up to, but not including, `end`. If start is greater than end the params are swapped to support negative ranges.
 *
 * Differences from lodash:
 * - `start` and `end` are both required
 * - does not coerce falsey bounds to `0`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,388 bytes
 * - Micro-dash: 59 bytes
 */
// tslint:disable-next-line:variable-name
export function inRange(number: number, start: number, end: number) {
  return number >= Math.min(start, end) && number < Math.max(start, end);
}
