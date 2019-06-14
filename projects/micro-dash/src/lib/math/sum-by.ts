import { Function1 } from "s-ng-dev-utils";

/**
 * This method is like `sum` except that it accepts `iteratee` which is invoked for each element in `array` to generate the value to be summed. The iteratee is invoked with one argument: (value).
 *
 * Differences from lodash:
 * - does not skip `undefined` values
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 14,047 bytes
 * - Micro-dash: 63 bytes
 */
export function sumBy<T>(array: T[], iteratee: Function1<T, number>) {
  return array.reduce((sum, element) => sum + iteratee(element), 0);
}
