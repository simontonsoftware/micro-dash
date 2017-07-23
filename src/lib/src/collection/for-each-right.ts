import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forOwnRight} from '../object/for-own-right';

export function forEachRight<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): void;
export function forEachRight<T>(
  array: ObjectWith<T> | undefined, iteratee: ObjectIteratee<T, void>,
): void;

export function forEachRight<T>(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    for (let i = collection.length; --i >= 0; ) {
      iteratee(collection[i], i);
    }
  } else if (collection) {
    forOwnRight(collection, iteratee);
  }
}
