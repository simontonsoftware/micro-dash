/**
 * Creates a shallow clone of value.
 *
 * Differences from lodash:
 * - only supports arrays and plain objects. Anything else will result in a plain object with its own properties shallowly assigned.
 */
export function clone<T extends {} | any[]>(value: T): T {
  if (Array.isArray(value)) {
    return value.slice() as any;
  } else {
    return Object.assign({}, value);
  }
}
