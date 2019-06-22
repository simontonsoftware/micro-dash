import { pullAll } from "./pull-all";
import { flatten } from "./flatten";

/**
 * Creates an array of array values not included in the other given arrays. The order and references of result values are determined by the first array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,422 bytes
 * - Micro-dash: 483 bytes
 */
export function difference<T>(array: T[], ...values: T[][]) {
  return pullAll(array.slice(), flatten(values));
}
