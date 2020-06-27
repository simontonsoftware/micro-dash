import { Drop1Arg, Drop2Args, Drop3Args, Drop4Args, Key } from '../interfaces';

/**
 * Creates a function that invokes the method at `object[key]` with `partials` prepended to the arguments it receives. Allows bound functions to reference methods that may be redefined or don't yet exist. See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern) for more details.
 *
 * Differences from lodash:
 * - there is no "placeholder" functionality
 * - it will return plain functions; they will not inherit the prototype of `object[key]`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 9,121 bytes
 * - Micro-dash: 55 bytes
 */

export function bindKey<
  K extends Key,
  T extends { [key in K]: (...args: any[]) => any }
>(object: T, key: K): (...args: Parameters<T[K]>) => ReturnType<T[K]>;
export function bindKey<
  K extends Key,
  A1,
  T extends { [key in K]: (...args: [A1, ...any[]]) => any }
>(object: T, key: K, arg1: A1): Drop1Arg<T[K]>;
export function bindKey<
  K extends Key,
  A1,
  A2,
  T extends { [key in K]: (...args: [A1, A2, ...any[]]) => any }
>(object: T, key: K, arg1: A1, arg2: A2): Drop2Args<T[K]>;
export function bindKey<
  K extends Key,
  A1,
  A2,
  A3,
  T extends { [key in K]: (...args: [A1, A2, A3, ...any[]]) => any }
>(object: T, key: K, arg1: A1, arg2: A2, arg3: A3): Drop3Args<T[K]>;
export function bindKey<
  K extends Key,
  A1,
  A2,
  A3,
  A4,
  T extends { [key in K]: (...args: [A1, A2, A3, A4, ...any[]]) => any }
>(object: T, key: K, arg1: A1, arg2: A2, arg3: A3, arg4: A4): Drop4Args<T[K]>;

// catch-all
export function bindKey<
  K extends Key,
  A1,
  A2,
  A3,
  A4,
  T extends { [key in K]: (...args: [A1, A2, A3, A4, ...any[]]) => any }
>(
  object: T,
  key: K,
  ...args: [A1, A2, A3, A4, ...any[]]
): (...args: any[]) => ReturnType<T[K]>;

export function bindKey(object: any, key: any, ...partials: any[]): any {
  return (...args: any[]) => object[key](...partials, ...args);
}
