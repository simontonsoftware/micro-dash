/**
 * Repeats the given string `n` times.
 *
 * Differences from lodash:
 * - does not work as an iteratee for methods like `map`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,357 bytes
 * - Micro-dash: 62 bytes
 */
// tslint:disable-next-line:variable-name
export function repeat(string: string, n: number): string {
  // tslint:disable-next-line:no-bitwise
  return n < 0 ? '' : new Array(n | 0).fill(string).join('');
}
