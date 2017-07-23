import {ObjectIteratee, ObjectWith} from '../interfaces';

export function forOwn<T>(
  object: ObjectWith<T>, iteratee: ObjectIteratee<T, void>,
) {
  Object.getOwnPropertyNames(object).forEach((key) => {
    iteratee(object[key], key);
  });
}
