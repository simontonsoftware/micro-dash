/**
 * Creates a shallow clone of value.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 12,772 bytes
 * - Micro-dash: 68 bytes
 */
export function clone<T extends {} | any[]>(value: T): T {
  if (Array.isArray(value)) {
    return value.slice() as any;
  } else {
    return Object.assign({}, value);
  }
}
