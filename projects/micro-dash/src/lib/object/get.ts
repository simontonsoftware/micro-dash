import { Nil } from "s-ng-dev-utils";

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,186 bytes
 * - Micro-dash: 65 bytes
 */

export function get<D>(object: object, path: [], defaultValue?: D): D;
export function get<T, K1 extends keyof T, D extends T[K1]>(
  object: T,
  path: [K1],
  defaultValue?: D,
): D extends undefined ? T[K1] : Exclude<T[K1], undefined>;
export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  D extends T[K1][K2]
>(
  object: T,
  path: [K1, K2],
  defaultValue?: D,
): D extends undefined ? T[K1][K2] : Exclude<T[K1][K2], undefined>;
export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  D extends T[K1][K2][K3]
>(
  object: T,
  path: [K1, K2, K3],
  defaultValue?: D,
): D extends undefined ? T[K1][K2][K3] : Exclude<T[K1][K2][K3], undefined>;
export function get<
  T,
  K1 extends keyof T,
  K2 extends keyof T[K1],
  K3 extends keyof T[K1][K2],
  K4 extends keyof T[K1][K2][K3],
  D extends T[K1][K2][K3][K4]
>(
  object: T,
  path: [K1, K2, K3, K4],
  defaultValue?: D,
): D extends undefined
  ? T[K1][K2][K3][K4]
  : Exclude<T[K1][K2][K3][K4], undefined>;
export function get(
  object: object | Nil,
  path: string[],
  defaultValue?: any,
): any;

export function get(object: any, path: string[], defaultValue?: any) {
  // const val = property(path)(object);
  // return isUndefined(val) ? defaultValue : val;
  const length = path.length;
  let index = 0;
  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return !index || index < length || object === undefined
    ? defaultValue
    : object;
}
