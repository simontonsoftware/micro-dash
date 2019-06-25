import { Nil, Primitive } from "../interfaces";
import { values } from "../object";

/**
 * Converts `value` to an array.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 6,042 bytes
 * - Micro-dash: 171 bytes
 */

export function toArray(value: string): string[];
export function toArray<T extends any[]>(value: T): T;
export function toArray<T extends object>(value: T): Array<T[keyof T]>;
export function toArray(value: Primitive | Nil): [];
export function toArray(value: any): any[];

export function toArray(value: any) {
  if (value && value[Symbol.iterator]) {
    return Array.from(value);
  } else {
    return values(value);
  }
}
