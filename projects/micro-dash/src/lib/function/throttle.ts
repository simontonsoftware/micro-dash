/**
 * Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds. The throttled function comes with a `cancel` method to cancel delayed `func` invocations and a `flush` method to immediately invoke them. Provide `options` to indicate whether `func` should be invoked on the leading and/or trailing edge of the `wait` timeout. The `func` is invoked with the last arguments provided to the throttled function.
 *
 *  **Note**: If `leading` and `trailing` options are `true`, `func` is invoked on the trailing edge of the timeout only if the throttled function is invoked more than once during the `wait` timeout.
 *
 * If `wait` is 0 and `leading` is `false`, `func` invocation is deferred until to the next tick, similar to `setTimeout` with a timeout of 0.
 *
 * Differences from lodash:
 * - does not return the results of the last invocation
 * - does not make any guarantees about the value of `this` in `func`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,290 bytes
 * - Micro-dash: 339 bytes
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  wait = 0,
  { leading = true, trailing = true } = {},
): ((...args: Parameters<T>) => void) & { cancel(): void; flush(): void } {
  let tail = 0;
  let nextArgs: Parameters<T> | undefined;
  let timeoutId: any;

  // helpers to save some bytes
  const now = () => performance.now();
  const setNewTail = () => {
    tail = now() + wait;
  };

  const cancel = () => {
    clearTimeout(timeoutId);
    timeoutId = undefined;
    nextArgs = undefined;
    tail = 0;
  };

  const flush = () => {
    if (nextArgs) {
      const args = nextArgs;
      cancel();

      setNewTail();
      func(...args);
    }
  };

  const throttled = (...args: Parameters<T>) => {
    nextArgs = args;
    const delay = Math.max(0, tail - now());
    if (!delay && (leading || timeoutId)) {
      flush();
    } else if (trailing) {
      if (!delay) {
        setNewTail();
      }
      clearTimeout(timeoutId);
      timeoutId = setTimeout(flush, delay || wait);
    }
  };

  return Object.assign(throttled, { cancel, flush });
}
