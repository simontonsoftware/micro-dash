import { clone } from '../lang/clone';

/**
 * The opposite of `pick`; this method creates an object composed of the own enumerable string properties of object that are not omitted.
 *
 * Differences from lodash:
 * - `paths` must be direct keys of `object` (they cannot refer to deeper properties)
 * - does not work with arrays
 * - `omit(obj, -0)` (which is a type error) acts like `omit(obj, '0')` instead of `omit(obj, '-0')`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,624 bytes
 * - Micro-dash: 329 bytes
 */
export function omit<T extends object | null | undefined>(
  object: T,
  ...paths: Array<keyof T>
): Partial<T> {
  const obj: any = clone(object) || {};
  for (const path of paths) {
    delete obj[path];
  }
  return obj;
}
