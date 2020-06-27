import { last } from '../array';
import { isBoolean } from '../lang';

/**
 * Produces a random number between the inclusive `lower` and `upper` bounds. If only one argument is provided a number between `0` and the given number is returned. If `floating` is true, or either `lower` or `upper` are floats, a floating-point number is returned instead of an integer.
 *
 * Differences from lodash:
 * - does not coerce arguments into finite numbers. E.g. if you supply `NaN` or `Infinity`, results are not guaranteed.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,258 bytes
 * - Micro-dash: 265 bytes
 */

export function random(floating?: boolean): number;
export function random(upper: number, floating?: boolean): number;
export function random(
  lower: number,
  upper: number,
  floating?: boolean,
): number;

export function random(...args: any[]): number {
  let lower = 0;
  let upper = 1;
  if (isFinite(args[1])) {
    [lower, upper] = args;
  } else if (isFinite(args[0])) {
    [upper] = args;
  }
  [lower, upper] = [lower, upper].sort();

  let floating = last(args);
  if (!isBoolean(floating)) {
    floating = !Number.isInteger(lower) && !Number.isInteger(upper);
  }

  let range = upper - lower;
  if (!floating) {
    ++range;
  }
  let result = Math.random() * range + lower;
  if (!floating) {
    result = Math.floor(result);
  }
  return result;
}

// /**
//  * Produces a random number between the inclusive `lower` and `upper` bounds. If only one argument is provided a number between `0` and the given number is returned. If `floating` is true, or either `lower` or `upper` are floats, a floating-point number is returned instead of an integer.
//  *
//  * **Note:** JavaScript follows the IEEE-754 standard for resolving floating-point values which can produce unexpected results.
//  *
//  * Differences from lodash:
//  * - requires each argument to be provided in its documented spot. E.g. `floating` must always be the third argument, and `lower` should not be greater than `upper`.
//  * - does not coerce arguments into finite numbers. E.g. if you supply `NaN` or `Infinity`, results are not guaranteed.
//  *
//  * Contribution to minified bundle size, when it is the only function imported:
//  */
// export function random(
//   lower = 0,
//   upper = 1,
//   floating = !(Number.isInteger(lower) && Number.isInteger(upper)),
// ) {
//   let range = upper - lower;
//   if (!floating) {
//     ++range;
//   }
//   let result = Math.random() * range + lower;
//   if (!floating) {
//     result = Math.floor(result);
//   }
//   return result;
// }
