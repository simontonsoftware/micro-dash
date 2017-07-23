import {ArrayIteratee, ObjectIteratee, ObjectWith} from '../interfaces';
import {forEach} from './for-each';

export function keyBy<T>(
  array: T[] | undefined, iteratee: ArrayIteratee<T, void>,
): void;
export function keyBy<T>(
  array: ObjectWith<T> | undefined, iteratee: ObjectIteratee<T, void>,
): void;

export function keyBy<T>(collection: any, iteratee: any) {
  const obj: ObjectWith<T> = {};
  forEach(collection, (value: T, indexOrKey) => {
    obj[iteratee(value, indexOrKey)] = value;
  });
  return obj;
}
