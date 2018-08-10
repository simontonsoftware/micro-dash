import { keys } from './keys';

/**
 * Creates an array of the own enumerable string keyed property values of `object`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,368 bytes
 * - Micro-dash: 82 bytes
 */
export function values<T>(object: T) {
  return keys(object).map((key) => object[key as keyof T]);
}
