import { range, times } from 'lodash-es';
import { expectType } from 's-ng-dev-utils';
import { difference } from './difference';

describe('difference()', () => {
  it('has fancy typing', () => {
    expectType<number[]>(difference([1]));
    expectType<string[]>(difference(['hi'], ['mom']));
    expectType<Array<string | number>>(
      difference<string | number>([1], ['hi']),
    );
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the difference of two arrays', () => {
    expect(difference([2, 1], [2, 3])).toEqual([1]);
  });

  it('should return the difference of multiple arrays', () => {
    expect(difference([2, 1, 2, 3], [3, 4], [3, 2])).toEqual([1]);
  });

  it('should match `NaN`', () => {
    expect(difference([1, NaN, 3], [NaN, 5, NaN])).toEqual([1, 3]);
  });

  it('should work with large arrays', () => {
    const array1: any[] = range(201);
    const array2: any[] = range(200);
    const a = {};
    const b = {};
    const c = {};
    array1.push(a, b, c);
    array2.push(b, c, a);

    expect(difference(array1, array2)).toEqual([200]);
  });

  it('should work with large arrays of `NaN`', () => {
    const largeArray = times(200, () => NaN);
    expect(difference([1, NaN, 3], largeArray)).toEqual([1, 3]);
  });

  it('should work with large arrays of objects', () => {
    const object1 = {};
    const object2 = {};
    const largeArray = times(200, () => object1);

    expect(difference([object1, object2], largeArray)).toEqual([object2]);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = difference(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
