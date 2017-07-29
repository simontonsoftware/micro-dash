/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 * - `get(obj, [-0])` (which is a type error) acts like `get(obj, ['0'])` instead of `get(obj, ['-0'])
 *
 * Contribution to minified bundle size, when it is the only function imported:
 */
export function get(
  object: object | null | undefined, path: string[], defaultValue?: any,
) {
  const length = path.length;
  let index = 0;
  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return !index || index < length || object === undefined
    ? defaultValue
    : object;
}
