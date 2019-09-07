import { flatten } from "../array";
import { IfCouldBe, Nil } from "../interfaces";
import { get } from "./get";

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * Differences from lodash:
 * - does not handle a dot-separated strings within `paths`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash:
 * - Micro-dash:
 */

export function at<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>
>(
  object: T,
  path: [K1, K2],
):
  | [NonNullable<T>[K1], NonNullable<T>[K2]]
  | IfCouldBe<T, Nil, [undefined, undefined]>;

export function at(object: any, ...paths: any[]) {
  return flatten(paths).map((path) => get(object, path));
}
