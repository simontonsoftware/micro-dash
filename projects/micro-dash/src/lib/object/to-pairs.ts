import { StringifiedKey } from '../interfaces';
import { keys } from './keys';

/**
 * Creates an array of own enumerable string keyed-value pairs for `object` which can be consumed by `fromPairs`.
 *
 * Differences from lodash:
 * - does not give any special consideration for arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,893 bytes
 * - Micro-dash: 175 bytes
 */
export function toPairs<T>(object: T): Array<[StringifiedKey<T>, T[keyof T]]> {
  return keys(object).map((key) => [key, object[key as keyof T]]);
}
