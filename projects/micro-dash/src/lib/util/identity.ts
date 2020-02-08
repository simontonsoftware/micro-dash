/**
 * This method returns the first argument it receives.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 43 bytes
 * - Micro-dash: 23 bytes
 */
export function identity<T>(value: T) {
  return value;
}
