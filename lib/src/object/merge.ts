import {forOwn} from './for-own';
import {cloneDeep} from '../lang/clone-deep';
import {forEach} from '../collection/for-each';

/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object. Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This function mutates `object`.
 *
 * Differences from lodash:
 * - will overwrite a value with `undefined`
 * - only supports arguments that are objects
 * - cannot handle circular references
 * - when merging an array onto a non-array, the result is a non-array
 */
export function merge<T extends object>(
  object: T, ...sources: Array<Partial<T>>,
): T;
export function merge<
  A extends object, B extends object
>(object: A, source: B): A & B;
export function merge<
  A extends object, B extends object, C extends object
>(object: A, source1: B, source2: C): A & B & C;
export function merge<
  A extends object, B extends object, C extends object, D extends object
>(object: A, source1: B, source2: C, source3: D): A & B & C & D;
export function merge<
  A extends object,
  B extends object,
  C extends object,
  D extends object,
  E extends object
>(
  object: A, source1: B, source2: C, source3: D, source4: E
): A & B & C & D & E;
export function merge<
  A extends object,
  B extends object,
  C extends object,
  D extends object,
  E extends object,
  F extends object
>(
  object: A, source1: B, source2: C, source3: D, source4: E, source5: F,
): A & B & C & D & E & F;

export function merge(object: any, ...sources: any[]) {
  for (const source of sources) {
    forEach<any>(source, (value, key) => {
      const myValue = object[key];
      if (myValue instanceof Object) {
        merge(myValue, value);
      } else {
        object[key] = cloneDeep(value);
      }
    });
  }
  return object;
}
