import {forOwn} from './for-own';
import {ObjectIteratee, ObjectWith} from '../interfaces';

export function mapValues<I, O>(
  object: ObjectWith<I>, iteratee: ObjectIteratee<I, O>,
) {
  const obj: ObjectWith<O> = {};
  forOwn(object, (value, key) => { obj[key] = iteratee(value, key); });
  return obj;
}
