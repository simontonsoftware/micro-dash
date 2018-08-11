import { cloneDeep, isMatch } from '../lang';

/**
 * Creates a function that performs a partial deep comparison between a given `object` and `source`, returning `true` if the given object has equivalent property values, else `false`.
 *
 * Note: The created function is equivalent to `isMatch` with source partially applied.
 *
 * Partial comparisons will match empty array and empty object source values against any array or object value, respectively.
 *
 * Differences from lodash:
 * - does not match `0` to `-0`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,993 bytes
 * - Micro-dash: 1,264 bytes
 */
export function matches(source: any) {
  source = cloneDeep(source);
  return (value: any) => isMatch(value, source);
}
