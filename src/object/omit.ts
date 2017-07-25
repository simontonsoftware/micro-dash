import {clone} from '../lang/clone';

/**
 * The opposite of _.pick; this method creates an object composed of the own enumerable property paths of object that are not omitted.
 *
 * **Differences from lodash:**
 * - the result does not contain inherited properties of `object`
 * - `paths` must be direct keys of `object` (they cannot refer to deeper properties)
 */
export function omit<T extends object>(
  object: T, ...paths: Array<keyof T>,
): Partial<T> {
  const obj = clone(object);
  for (const path of paths) {
    delete obj[path];
  }
  return obj;
}
