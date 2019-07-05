import { keys } from "./keys";

/**
 * Creates an array of own enumerable string keyed-value pairs for `object` which can be consumed by `fromPairs`.
 *
 * Differences from lodash:
 * - does not give any special consideration for arguments objects, strings, or prototype objects (e.g. many will have `'length'` in the returned array)
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,004 bytes
 * - Micro-dash: 211 bytes
 */
export function toPairs<T>(
  object: T,
): Array<
  [Extract<keyof T, number> extends never ? keyof T : string, T[keyof T]]
> {
  // This casting should not be needed after typedoc can support typescript 3.4
  // https://github.com/TypeStrong/typedoc/issues/1059
  return keys(object).map((key) => [key, object[key as keyof T]]) as any;
}
