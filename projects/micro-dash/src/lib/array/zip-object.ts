import { Key } from '../interfaces';
import { transform } from '../object';

/**
 * This method is like `fromPairs` except that it accepts two arrays, one of property identifiers and one of corresponding values.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 1,835 bytes
 * - Micro-dash: 291 bytes
 */

export function zipObject<K extends [Key], V extends [any, ...any[]]>(
  props: K,
  values: V,
): { [k in K[0]]: V[0] };
export function zipObject<K extends [Key, Key], V extends [any, any, ...any[]]>(
  props: K,
  values: V,
): { [k in K[0]]: V[0] } & { [k in K[1]]: V[1] };
export function zipObject<
  K extends [Key, Key, Key],
  V extends [any, any, any, ...any[]]
>(
  props: K,
  values: V,
): { [k in K[0]]: V[0] } & { [k in K[1]]: V[1] } & { [k in K[2]]: V[2] };
export function zipObject<
  K extends [Key, Key, Key, Key],
  V extends [any, any, any, any, ...any[]]
>(
  props: K,
  values: V,
): { [k in K[0]]: V[0] } &
  { [k in K[1]]: V[1] } &
  { [k in K[2]]: V[2] } &
  { [k in K[3]]: V[3] };
export function zipObject<K extends Key, V>(
  props: K[],
  values: V[],
): { [k in K]: V | undefined };

export function zipObject(props: Key[], values: any[]): any {
  return transform(props, (accumulator: any, prop, index) => {
    accumulator[prop] = values[index];
  });
}
