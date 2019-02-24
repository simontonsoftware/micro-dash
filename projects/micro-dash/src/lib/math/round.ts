/**
 * Computes `number` rounded to `precision`.
 *
 * ```ts
 * round(4.006); // 4
 * round(4.006, 2); // 4.01
 * round(4060, -2); // 4100
 * ```
 *
 * Differences from lodash:
 * - may return `NaN` with large `precision` values
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,803 bytes
 * - Micro-dash: 92 bytes
 */
export function round(number: number, precision = 0) {
  const factor = 10 ** Math.trunc(precision);
  return Math.round(number * factor) / factor;
}
