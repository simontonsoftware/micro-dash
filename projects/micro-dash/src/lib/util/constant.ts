/**
 * Creates a function that returns `value`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 48 bytes
 * - Micro-dash: 4 bytes
 */
export function constant<T>(value: T) {
  return () => value;
}
