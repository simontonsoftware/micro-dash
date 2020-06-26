/** @hidden */
let nextId = 1;

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,062 bytes
 * - Micro-dash: 38 bytes
 */
export function uniqueId(prefix = '') {
  return prefix + nextId++;
}
