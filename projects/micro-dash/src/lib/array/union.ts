import { flatten } from './flatten';

/**
 * Creates an array of unique values, in order, from all given `arrays`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,197 bytes
 * - Micro-dash: 50 bytes
 */
export function union<T>(...arrays: T[][]) {
  return Array.from(new Set(flatten(arrays)));
}
