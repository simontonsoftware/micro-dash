/**
 * Creates a shallow clone of value.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 */
export function clone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.slice() as any;
  } else if (value instanceof Object) {
    return Object.assign({}, value);
  } else {
    return value;
  }
}
