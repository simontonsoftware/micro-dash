import { NonUndefined } from "utility-types";
import { Existent, Key, Nil } from "../interfaces";
import { isFunction } from "../lang";
import { get } from "./get";

type Fn = (...args: any[]) => any;

type Obj1<K1 extends Key, V> = { [key in K1]?: V };
type Path1<K1 extends Key, T extends Obj1<K1, any> | Nil> = T extends Existent
  ? T[K1]
  : NonNullable<T>[K1] | undefined;
type DefinedPath1<K1 extends Key, T extends Obj1<K1, any> | Nil> = NonUndefined<
  NonNullable<T>[K1]
>;

type Obj2<K1 extends Key, K2 extends Key, V> = { [k1 in K1]?: Obj1<K2, V> };
type Path2<
  K1 extends Key,
  K2 extends Key,
  T extends Obj2<K1, K2, any> | Nil
> = Path1<K2, Path1<K1, T>>;
type DefinedPath2<
  K1 extends Key,
  K2 extends Key,
  T extends Obj2<K1, K2, any> | Nil
> = DefinedPath1<K2, DefinedPath1<K1, T>>;

type Obj3<K1 extends Key, K2 extends Key, K3 extends Key, V> = {
  [k1 in K1]?: Obj2<K2, K3, V>
};
type Path3<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  T extends Obj3<K1, K2, K3, any> | Nil
> = Path1<K3, Path2<K1, K2, T>>;
type DefinedPath3<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  T extends Obj3<K1, K2, K3, any> | Nil
> = DefinedPath1<K3, DefinedPath2<K1, K2, T>>;

type Obj4<K1 extends Key, K2 extends Key, K3 extends Key, K4 extends Key, V> = {
  [k1 in K1]?: Obj3<K2, K3, K4, V>
};
type Path4<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  K4 extends Key,
  T extends Obj4<K1, K2, K3, K4, any> | Nil
> = Path1<K4, Path3<K1, K2, K3, T>>;
type DefinedPath4<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  K4 extends Key,
  T extends Obj4<K1, K2, K3, K4, any> | Nil
> = DefinedPath1<K4, DefinedPath3<K1, K2, K3, T>>;

/**
 * Invokes the method at `path` of `object`.
 *
 * Differences from lodash:
 * - only accepts an array for `path`, not a dot-separated string
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,430 bytes
 * - Micro-dash: 324 bytes
 */

// 4 element path
export function invoke<
  K1 extends Key,
  K2 extends Key,
  K3 extends Key,
  K4 extends Key,
  T extends Obj4<K1, K2, K3, K4, Fn> | Nil
>(
  object: T,
  path: [K1, K2, K3, K4],
  ...args: Parameters<DefinedPath4<K1, K2, K3, K4, T>>
): Path4<K1, K2, K3, K4, T> extends DefinedPath4<K1, K2, K3, K4, T>
  ? ReturnType<DefinedPath4<K1, K2, K3, K4, T>>
  : ReturnType<DefinedPath4<K1, K2, K3, K4, T>> | undefined;

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
