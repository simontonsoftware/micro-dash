/**
 * Clamps `number` within the inclusive lower and upper bounds.
 *
 * Differences from lodash:
 * - `lower` is required
 * - does not coerce bounds that are `NaN` to be `0`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,398 bytes
 * - Micro-dash: 51 bytes
 */
// tslint:disable-next-line:variable-name
export function clamp(number: number, lower: number, upper: number) {
  return Math.min(upper, Math.max(lower, number));
}
