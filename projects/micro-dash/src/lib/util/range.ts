import { isUndefined } from '../lang';
import { times } from './times';

/**
 * Creates an array of numbers _(positive and/or negative)_ progressing from `start` up to, but not including, `end`. A `step` of `-1` is used if a negative `start` is specified without an `end` or `step`. If `end` is not specified, it's set to `start` with `start` then set to `0`.
 *
 * Note: JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
 *
 * Differences from lodash:
 * - does not work as an iteratee for methods like `map`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,020 bytes
 * - Micro-dash: 181 bytes
 */

export function range(end: number): number[];
// tslint:disable-next-line:unified-signatures
export function range(start: number, end: number, step?: number): number[];

export function range(start: number, end?: number, step?: number): number[] {
  if (isUndefined(end)) {
    end = start;
    start = 0;
  }
  if (isUndefined(step)) {
    step = end < start ? -1 : 1;
  }
  return times(Math.abs((end - start) / (step || 1)), (i) => start + step! * i);
}
