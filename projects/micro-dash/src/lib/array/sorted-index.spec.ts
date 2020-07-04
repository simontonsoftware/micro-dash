import { identity } from 'lodash-es';
import { sortBy } from '../collection/sort-by';
import { sortedIndex } from './sorted-index';

describe('sortedIndex()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the insert index', () => {
    const array = [30, 50];
    expect(sortedIndex(array, 30)).toBe(0);
    expect(sortedIndex(array, 40)).toBe(1);
    expect(sortedIndex(array, 50)).toBe(1);
  });

  it('should work with an array of strings', () => {
    const array = ['a', 'c'];
    expect(sortedIndex(array, 'a')).toBe(0);
    expect(sortedIndex(array, 'b')).toBe(1);
    expect(sortedIndex(array, 'c')).toBe(1);
  });

  it('should accept a nullish `array` and a `value`', () => {
    expect(sortedIndex(null, 1)).toBe(0);
    expect(sortedIndex(null, undefined)).toBe(0);
    expect(sortedIndex(null, NaN)).toBe(0);
    expect(sortedIndex(undefined, 1)).toBe(0);
    expect(sortedIndex(undefined, undefined)).toBe(0);
    expect(sortedIndex(undefined, NaN)).toBe(0);
  });

  it('should align with `_.sortBy`', () => {
    const expected = [1, '2', null, undefined, NaN, NaN];

    // sanity check assumption that `expected` matches `sortBy`
    for (const array of [
      [NaN, null, 1, '2', NaN, undefined],
      ['2', null, 1, NaN, NaN, undefined],
    ]) {
      expect(sortBy(array, identity)).toEqual(expected);
    }

    expect(sortedIndex(expected, 3)).toBe(2);
    expect(sortedIndex(expected, null)).toBe(2);
    expect(sortedIndex(expected, undefined)).toBe(3);
    expect(sortedIndex(expected, NaN)).toBe(4);
  });

  it('should align with `_.sortBy` for nulls', () => {
    const array = [null, null];
    expect(sortedIndex(array, null)).toBe(0);
    expect(sortedIndex(array, 1)).toBe(0);
    expect(sortedIndex(array, 'a')).toBe(0);
  });
});
