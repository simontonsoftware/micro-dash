/**
 * Creates a function that returns `value`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 57 bytes
 * - Micro-dash: 26 bytes
 */
export function constant<T>(value: T) {
  return () => value;
}
