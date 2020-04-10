import { pullAll } from "./pull-all";

/**
 * Removes all given values from array using `SameValueZero` for equality comparisons.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,000 bytes
 * - Micro-dash: 166 bytes
 */
export function pull<T>(array: T[], ...values: T[]) {
  return pullAll(array, values);
}
