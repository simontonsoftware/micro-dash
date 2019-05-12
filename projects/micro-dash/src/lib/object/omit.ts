import { Nil } from "../interfaces";
import { clone } from "../lang/clone";

/**
 * The opposite of `pick`; this method creates an object composed of the own enumerable string properties of object that are not omitted.
 *
 * Differences from lodash:
 * - `paths` must be direct keys of `object` (they cannot refer to deeper properties)
 * - does not work with arrays
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,883 bytes
 * - Micro-dash: 342 bytes
 */
export function omit<T extends object | Nil>(
  object: T,
  ...paths: Array<keyof T>
): Partial<T> {
  const obj: any = clone(object) || {};
  for (const path of paths) {
    delete obj[path];
  }
  return obj;
}
