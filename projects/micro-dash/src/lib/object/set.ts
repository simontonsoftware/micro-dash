import { constant } from '../util';
import { update } from './update';

/**
 * Sets the value at `path` of `object`. If a portion of `path` doesn't exist, it's created. Arrays are created for missing index properties while objects are created for all other missing properties.
 *
 * **Note:** This method mutates `object`.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 * - does not handle `customizer` returning `undefined`
 * - using `-0` in the path (which is a type error) acts like `'0'` instead of `'-0'`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,885 bytes
 * - Micro-dash: 245 bytes
 */
export function set<T>(object: T, path: Array<string | number>, value: any): T {
  return update(object, path, constant(value));
}
