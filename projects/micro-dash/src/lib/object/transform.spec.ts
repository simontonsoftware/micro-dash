import { identity, noop } from 'lodash-es';
import { ObjectWith } from '../interfaces';
import { transform } from './transform';

describe('transform', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should support an `accumulator` value', () => {
    const array = [1, 2, 3];
    const object = { a: 1, b: 2, c: 3 };

    const squareAndPush = (result: number[], value: number) => {
      result.push(value ** 2);
    };
    expect(transform(array, squareAndPush, [] as number[])).toEqual([1, 4, 9]);
    expect(transform(object, squareAndPush, [] as number[])).toEqual([1, 4, 9]);

    const squareAndSet = (
      result: ObjectWith<number>,
      value: number,
      key: string | number,
    ) => {
      result[key] = value ** 2;
    };
    expect(transform(array, squareAndSet, {})).toEqual({ 0: 1, 1: 4, 2: 9 });
    expect(transform(object, squareAndSet, {})).toEqual({ a: 1, b: 4, c: 9 });

    testAccumulatorReturned([]);
    testAccumulatorReturned({});
    testAccumulatorReturned(null);

    function testAccumulatorReturned(accumulator: any): void {
      expect(transform(array, noop, accumulator)).toBe(accumulator);
      expect(transform(object, noop, accumulator)).toBe(accumulator);
      expect(transform(undefined, identity, accumulator)).toBe(accumulator);
    }
  });

  it('should create an empty object when given a falsey `object`', () => {
    expect(transform(undefined, identity)).toEqual({});
  });

  it('should provide correct `iteratee` arguments when transforming an array', () => {
    const spy = jasmine.createSpy();
    const object = [1, 2, 3];
    expect(transform(object, spy)).not.toBe(object);
    expect(spy.calls.first().args).toEqual([jasmine.anything(), 1, 0]);
  });

  it('should provide correct `iteratee` arguments when transforming an object', () => {
    const spy = jasmine.createSpy();
    const object = { a: 1, b: 2, c: 3 };
    expect(transform(object, spy)).not.toBe(object);
    expect(spy.calls.first().args).toEqual([jasmine.anything(), 1, 'a']);
  });

  it('can exit early when iterating arrays', () => {
    const array = [1, 2, 3];
    const values: number[] = [];

    transform(array, (_accumulator, value) => {
      values.push(value);
      return false;
    });

    expect(values).toEqual([1]);
  });

  it('can exit early when iterating arrays', () => {
    const object = { a: 1, b: 2, c: 3 };
    const values: number[] = [];

    transform(object, (_accumulator, value) => {
      values.push(value);
      return false;
    });

    expect(values).toEqual([1]);
  });
});
