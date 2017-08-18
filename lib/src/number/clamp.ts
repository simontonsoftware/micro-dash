/**
 * Clamps `number` within the inclusive lower and upper bounds.
 *
 * Differences from lodash:
 * - `lower` is not optional
 * - does not coerce bounds that are `NaN` to be `0`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,361 bytes
 * - Micro-dash: 0 bytes
 */
export function clamp(number: number, lower: number, upper: number) {
  return Math.min(upper, Math.max(lower, number));
}
