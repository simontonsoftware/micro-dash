import { IfCouldBe, Key, Nil } from '../interfaces';
import { castArray } from '../lang';

/** @hidden */
type WithDefault<V, D> =
  | (undefined extends D ? V : Exclude<V, undefined>)
  | (undefined extends V ? D : never);

/**
 * Gets the value at `path` of `object`. If the resolved value is `undefined`, the `defaultValue` is returned in its place.
 *
 * Differences from lodash:
 * - does not handle a dot-separated string for `path`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 5,049 bytes
 * - Micro-dash: 108 bytes
 */

export function get<T, K extends keyof NonNullable<T>, D = undefined>(
  object: T,
  key: K,
  defaultValue?: D,
): WithDefault<NonNullable<T>[K], D> | IfCouldBe<T, Nil, D>;

export function get<D = undefined>(
  object: object,
  path: [],
  defaultValue?: D,
): D;
export function get<T, K1 extends keyof NonNullable<T>, D = undefined>(
  object: T,
  path: [K1],
  defaultValue?: D,
): WithDefault<NonNullable<T>[K1], D> | IfCouldBe<T, Nil, D>;
export function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>[K1],
  D = undefined
>(
  object: T,
  path: [K1, K2],
  defaultValue?: D,
): WithDefault<NonNullable<T>[K1][K2], D> | IfCouldBe<T, Nil, D>;
export function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>[K1],
  K3 extends keyof NonNullable<T>[K1][K2],
  D = undefined
>(
  object: T,
  path: [K1, K2, K3],
  defaultValue?: D,
): WithDefault<NonNullable<T>[K1][K2][K3], D> | IfCouldBe<T, Nil, D>;
export function get<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>[K1],
  K3 extends keyof NonNullable<T>[K1][K2],
  K4 extends keyof NonNullable<T>[K1][K2][K3],
  D = undefined
>(
  object: T,
  path: [K1, K2, K3, K4],
  defaultValue?: D,
): WithDefault<NonNullable<T>[K1][K2][K3][K4], D> | IfCouldBe<T, Nil, D>;

export function get(object: object | Nil, path: Key[], defaultValue?: any): any;

export function get(object: any, path: Key | Key[], defaultValue?: any): any {
  // const val = property(path)(object);
  // return isUndefined(val) ? defaultValue : val;
  path = castArray(path);
  const length = path.length;
  let index = 0;
  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return !index || index < length || object === undefined
    ? defaultValue
    : object;
}
