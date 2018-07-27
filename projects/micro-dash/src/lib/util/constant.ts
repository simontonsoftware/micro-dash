/**
 * Creates a function that returns `value`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 49 bytes
 * - Micro-dash: 40 bytes
 */
export function constant<T>(value: T) {
  return () => value;
}
