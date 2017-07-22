import {forOwn} from './for-own';
import {ObjectWith} from '../interfaces';

export function values<T>(object: ObjectWith<T>) {
  const v: T[] = [];
  forOwn(object, (val) => { v.push(val); });
  return v;
}
