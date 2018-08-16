/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation. The `func` is invoked with the `this` binding and arguments of the created function.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,421 bytes
 * - Micro-dash: 60 bytes
 */
export function once<T extends Function>(func: T): T {
  let result: any;
  let needsCall = true;
  return (function(this: any) {
    if (needsCall) {
      needsCall = false;
      result = func.apply(this, arguments);
      (func as any) = null;
    }
    return result;
  } as any) as T;
}
