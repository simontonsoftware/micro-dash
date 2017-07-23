/**
 * Creates a shallow clone of value.
 *
 * **Difference from lodash:** it only supports cloning objects.
 */
export function clone<T>(value: T): T {
  return Object.assign({}, value);
}
