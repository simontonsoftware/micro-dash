import {ObjectWith} from '../interfaces';
import {forEachRight} from './for-each-right';

export function reduceRight<E, A>(
  array: E[] | undefined,
  iteratee: (accumulator: A, value: E, index: number) => A,
  accumulator: A,
): void;
export function reduceRight<E, A>(
  array: ObjectWith<E> | undefined,
  iteratee: (accumulator: A, value: E, key: keyof E) => A,
  accumulator: A,
): void;

export function reduceRight(collection: any, iteratee: any, accumulator: any) {
  forEachRight(collection, (value, indexOrKey) => {
    accumulator = iteratee(accumulator, value, indexOrKey);
  });
  return accumulator;
}
