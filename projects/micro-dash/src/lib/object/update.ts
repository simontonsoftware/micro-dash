/**
 * This method is like `set()` except that it accepts `updater` to produce the value to set.
 *
 * **Note:** This method mutates `object`.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 * - does not handle `customizer` returning `undefined`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,842 bytes
 * - Micro-dash: 178 bytes
 */
export function update<T>(
  object: T,
  path: Array<string | number>,
  updater: (val: any) => any,
): T {
  if (object && path.length) {
    let current: any = object;
    const length = path.length;
    for (let i = 0; i < length; ++i) {
      const key = path[i];
      let value = current[key];
      if (i < length - 1) {
        if (!(value instanceof Object)) {
          value = Number.isInteger(path[i + 1] as any) ? [] : {};
        }
      } else {
        value = updater(value);
      }
      current = current[key] = value;
    }
  }
  return object;
}
