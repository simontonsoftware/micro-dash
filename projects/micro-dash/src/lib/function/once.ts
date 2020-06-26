/**
 * Creates a function that is restricted to invoking `func` once. Repeat calls to the function return the value of the first invocation. The `func` is invoked with the `this` binding and arguments of the created function.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,423 bytes
 * - Micro-dash: 96 bytes
 */
export function once<T extends (...args: any[]) => any>(func: T) {
  let result: ReturnType<T>;
  let needsCall = true;
  return function (this: any, ...args: Parameters<T>) {
    if (needsCall) {
      needsCall = false;
      result = func.apply(this, args);

      // allow func and any of its variables to be garbage collected
      (func as any) = null;
    }
    return result;
  };
}
