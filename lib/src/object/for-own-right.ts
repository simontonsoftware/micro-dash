import {ObjectIteratee, ObjectWith} from '../interfaces';
import {forEachRight} from '../collection/for-each-right';

export function forOwnRight<T>(
  object: ObjectWith<T>, iteratee: ObjectIteratee<T, void>,
) {
  forEachRight(
    Object.getOwnPropertyNames(object),
    (key) => { iteratee(object[key], key); },
  );
}
