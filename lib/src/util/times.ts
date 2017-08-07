/**
 * Invokes the iteratee `n` times, returning an array of the results of each invocation.
 *
 * Differences from lodash:
 * - has undefined behavior when given a non natural number for `n`
 * - does not provide a default for `iteratee`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,586 bytes
 * - Micro-dash: 55 bytes
 */
export function times<T>(n: number, iteratee: (index: number) => T) {
  const result: T[] = Array(n);
  for (let i = 0; i < n; ++i) {
    result[i] = iteratee(i);
  }
  return result;
}
