import { Key, Nil } from "../interfaces";

type AtPath<T, P extends any[]> = undefined extends P[0]
  ? undefined
  : undefined extends P[1]
  ? T[P[0]]
  : undefined extends P[2]
  ? T[P[0]][P[1]]
  : undefined extends P[3]
  ? T[P[0]][P[1]][P[2]]
  : undefined extends P[4]
  ? T[P[0]][P[1]][P[2]][P[3]]
  : any;

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,189 bytes
 * - Micro-dash: 63 bytes
 */

export function get<
  T,
  O extends Exclude<T, Nil> = Exclude<T, Nil>,
  K1 extends keyof O = keyof O,
  K2 extends keyof O[K1] = keyof O[K1],
  K3 extends keyof O[K1][K2] = keyof O[K1][K2],
  K4 extends keyof O[K1][K2][K3] = keyof O[K1][K2][K3],
  P extends [K1?, K2?, K3?, K4?, ...any[]] = [K1?, K2?, K3?, K4?, ...any[]],
  D = undefined
>(
  object: T,
  path: P,
  defaultValue?: D,
): undefined extends T | AtPath<O, P>
  ? undefined extends D
    ? AtPath<O, P> | D
    : Exclude<AtPath<O, P> | D, undefined>
  : AtPath<O, P>;

export function get(object: object | Nil, path: Key[], defaultValue?: any): any;

export function get(object: any, path: Key[], defaultValue?: any) {
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
