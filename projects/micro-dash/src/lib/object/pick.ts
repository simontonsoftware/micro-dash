import { Nil } from "../interfaces";

/**
 * Creates an object composed of the picked `object` properties.
 *
 * Differences from lodash:
 * - `paths` must be direct properties of `object` (they cannot references deep properties)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 7,900 bytes
 * - Micro-dash: 278 bytes
 */
export function pick<T, K extends keyof T>(
  object: T | Nil,
  ...paths: K[]
): T extends Nil ? {} : Pick<T, K> {
  const result: any = {};
  if (object != null) {
    for (const path of paths) {
      result[path] = object[path];
    }
  }
  return result;
}
