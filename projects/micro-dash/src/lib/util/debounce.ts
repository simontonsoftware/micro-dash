/**
 * Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. The `func` is invoked with the last arguments provided to the debounced function.
 *
 * If `wait` is 0, `func` invocation is deferred until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * Differences from lodash:
 * - the debounced function does not come with `cancel` or `flush` methods
 * - does not accept options
 * - does not return the results of the last invocation
 * - does not make any guarantees about the value of `this` in `func` is executed
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,078 bytes
 * - Micro-dash: 170 bytes
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: unknown[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, wait, ...args);
  };
}
