import { map } from '../collection/map';
import { uniq } from './uniq';

describe('uniq()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return unique values of an unsorted array', () => {
    expect(uniq([2, 1, 2])).toEqual([2, 1]);
  });

  it('should return unique values of a sorted array', () => {
    expect(uniq([1, 2, 2])).toEqual([1, 2]);
  });

  it('should treat object instances as unique', () => {
    const objects = [
      { a: 2 },
      { a: 3 },
      { a: 1 },
      { a: 2 },
      { a: 3 },
      { a: 1 },
    ];
    expect(uniq(objects)).toEqual(objects);
  });

  it('should match `NaN`', () => {
    expect(uniq([NaN, NaN])).toEqual([NaN]);
  });

  it('should work with large arrays', () => {
    const largeArray: any[] = [];
    const expected = [0, {}, 'a'];
    for (const value of expected) {
      for (let i = 100; --i >= 0; ) {
        largeArray.push(value);
      }
    }

    expect(uniq(largeArray)).toEqual(expected);
  });

  it('should work with large arrays of boolean, `NaN`, and nullish values', () => {
    const largeArray: any[] = [];
    const expected = [null, undefined, false, true, NaN];
    for (const value of expected) {
      for (let i = 100; --i >= 0; ) {
        largeArray.push(value);
      }
    }

    expect(uniq(largeArray)).toEqual(expected);
  });

  it('should distinguish between numbers and numeric strings', () => {
    const largeArray: any[] = [];
    const expected = ['2', 2];
    for (const value of expected) {
      for (let i = 100; --i >= 0; ) {
        largeArray.push(value);
      }
    }

    expect(uniq(largeArray)).toEqual(expected);
  });

  it('should perform an unsorted uniq when used as an iteratee for methods like `_.map`', () => {
    expect(
      map(
        [
          [2, 1, 2],
          [1, 2, 1],
        ],
        uniq,
      ),
    ).toEqual([
      [2, 1],
      [1, 2],
    ]);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = uniq(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
