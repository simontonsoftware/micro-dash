import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forOwn} from '../object/for-own';

export function forEach<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): void;
export function forEach<T>(
  array: ObjectWith<T> | undefined, iteratee: ObjectIteratee<T, void>,
): void;

export function forEach(collection: any, iteratee: any) {
  if (Array.isArray(collection)) {
    collection.forEach(iteratee);
  } else if (collection) {
    forOwn(collection, iteratee);
  }
}
