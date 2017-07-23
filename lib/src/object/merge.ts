import {forOwn} from './for-own';

/**
 * Recursively merges own enumerable string keyed properties of source objects into the destination object. Array and plain object properties are merged recursively. Other objects and value types are overridden by assignment. Source objects are applied from left to right. Subsequent sources overwrite property assignments of previous sources.
 *
 * **Differences from lodash:**
 * - does not merge inherited properties
 * - will overwrite a value with `undefined`
 */
export function merge<T extends object>(
  object: T, ...sources: Array<Partial<T>>,
): T;
export function merge<A, B>(object: A, source: B): A & B;
export function merge<A, B, C>(object: A, source1: B, source2: C): A & B & C;
export function merge<A, B, C, D>(
  object: A, source1: B, source2: C, source3: D,
): A & B & C & D;
export function merge<A, B, C, D, E>(
  object: A, source1: B, source2: C, source3: D, source4: E
): A & B & C & D & E;
export function merge<A, B, C, D, E, F>(
  object: A, source1: B, source2: C, source3: D, source4: E, source5: F,
): A & B & C & D & E & F;

export function merge(object: any, ...sources: any[]) {
  for (const source of sources) {
    forOwn<any>(source, (value, key) => {
      const myValue = object[key];
      if (myValue instanceof Object) {
        merge(myValue, value);
      } else {
        object[key] = value;
      }
    });
  }
  return object;
}
