import { keys } from "./keys";

/**
 * Creates an array of own enumerable string keyed-value pairs for `object` which can be consumed by `fromPairs`.
 *
 * Differences from lodash:
 * - does not give any special consideration for arrays, arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,004 bytes
 * - Micro-dash: 83 bytes
 */
export function toPairs<T>(
  object: T,
): Array<[number extends keyof T ? string : keyof T, T[keyof T]]> {
  // This casting should not be needed after typedoc can support typescript 3.4
  // https://github.com/TypeStrong/typedoc/issues/1059
  return keys(object).map((key) => [key, object[key as keyof T]]) as Array<
    [number extends keyof T ? string : keyof T, T[keyof T]]
  >;
}
