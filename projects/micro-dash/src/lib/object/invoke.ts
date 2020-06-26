import { NonUndefined } from 'utility-types';
import { Existent, Key, Nil } from '../interfaces';
import { isFunction } from '../lang';
import { get } from './get';

/** @hidden */
type Fn = (...args: any[]) => any;

/** @hidden */
type Obj1<K1 extends Key, V> = { [key in K1]?: V };
/** @hidden */
type Path1<K1 extends Key, T extends Obj1<K1, any> | Nil> = T extends Existent
  ? T[K1]
  : NonNullable<T>[K1] | undefined;
/** @hidden */
type DefinedPath1<K1 extends Key, T extends Obj1<K1, any> | Nil> = NonUndefined<
  NonNullable<T>[K1]
>;

/** @hidden */
type Obj2<K1 extends Key, K2 extends Key, V> = { [k1 in K1]?: Obj1<K2, V> };
/** @hidden */
type Path2<
  K1 extends Key,
  K2 extends Key,
  T extends Obj2<K1, K2, any> | Nil
> = Path1<K2, Path1<K1, T>>;
/** @hidden */
type DefinedPath2<
  K1 extends Key,
  K2 extends Key,
  T extends Obj2<K1, K2, any> | Nil
> = DefinedPath1<K2, DefinedPath1<K1, T>>;

/** @hidden */
type Obj3<K1 extends Key, K2 extends Key, K3 extends Key, V> = {
  [k1 in K1]?: Obj2<K2, K3, V>;
};
/** @hidden */
type Path3<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  T extends Obj3<K1, K2, K3, any> | Nil
> = Path1<K3, Path2<K1, K2, T>>;
/** @hidden */
type DefinedPath3<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  T extends Obj3<K1, K2, K3, any> | Nil
> = DefinedPath1<K3, DefinedPath2<K1, K2, T>>;

// /** @hidden */
// type Obj4<K1 extends Key, K2 extends Key, K3 extends Key, K4 extends Key, V> = {
//   [k1 in K1]?: Obj3<K2, K3, K4, V>;
// };
// /** @hidden */
// type Path4<
//   K1 extends Key,
//   K2 extends Key,
//   K3 extends Key,
//   K4 extends Key,
//   T extends Obj4<K1, K2, K3, K4, any> | Nil
// > = Path1<K4, Path3<K1, K2, K3, T>>;
// /** @hidden */
// type DefinedPath4<
//   K1 extends Key,
//   K2 extends Key,
//   K3 extends Key,
//   K4 extends Key,
//   T extends Obj4<K1, K2, K3, K4, any> | Nil
// > = DefinedPath1<K4, DefinedPath3<K1, K2, K3, T>>;

/**
 * Invokes the method at `path` of `object`.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,253 bytes
 * - Micro-dash: 241 bytes
 */

// Removed for https://github.com/simontonsoftware/micro-dash/issues/33
// // 4 element path
// export function invoke<
//   K1 extends Key,
//   K2 extends Key,
//   K3 extends Key,
//   K4 extends Key,
//   T extends Obj4<K1, K2, K3, K4, Fn> | Nil
// >(
//   object: T,
//   path: [K1, K2, K3, K4],
//   ...args: Parameters<DefinedPath4<K1, K2, K3, K4, T>>
// ): Path4<K1, K2, K3, K4, T> extends DefinedPath4<K1, K2, K3, K4, T>
//   ? ReturnType<DefinedPath4<K1, K2, K3, K4, T>>
//   : ReturnType<DefinedPath4<K1, K2, K3, K4, T>> | undefined;

// 3 element path
export function invoke<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  T extends Obj3<K1, K2, K3, Fn> | Nil
>(
  object: T,
  path: [K1, K2, K3],
  ...args: Parameters<DefinedPath3<K1, K2, K3, T>>
): Path3<K1, K2, K3, T> extends DefinedPath3<K1, K2, K3, T>
  ? ReturnType<DefinedPath3<K1, K2, K3, T>>
  : ReturnType<DefinedPath3<K1, K2, K3, T>> | undefined;

// 2 element path
export function invoke<
  K1 extends Key,
  K2 extends Key,
  T extends Obj2<K1, K2, Fn> | Nil
>(
  object: T,
  path: [K1, K2],
  ...args: Parameters<DefinedPath2<K1, K2, T>>
): Path2<K1, K2, T> extends DefinedPath2<K1, K2, T>
  ? ReturnType<DefinedPath2<K1, K2, T>>
  : ReturnType<DefinedPath2<K1, K2, T>> | undefined;

// 1 element path
export function invoke<K1 extends Key, T extends Obj1<K1, Fn> | Nil>(
  object: T,
  path: [K1],
  ...args: Parameters<DefinedPath1<K1, T>>
): Path1<K1, T> extends DefinedPath1<K1, T>
  ? ReturnType<DefinedPath1<K1, T>>
  : ReturnType<DefinedPath1<K1, T>> | undefined;

// empty path
export function invoke(object: object | Nil, path: []): undefined;

// TODO: limit this so it doesn't apply to 1-4 element paths with bad parameters
// fallback: n element path
export function invoke(object: object | Nil, path: Key[], ...args: any[]): any;

export function invoke<T extends object | Nil>(
  object: T,
  path: Key[],
  ...args: any[]
) {
  const fn = get(object, path);
  if (isFunction(fn)) {
    return fn.apply(
      path.length === 1 ? object : get(object, path.slice(0, -1)),
      args,
    );
  }
}
