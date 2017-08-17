import {without} from './without';

describe('without()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the difference of values', () => {
    expect(without([2, 1, 2, 3], 1, 2)).toEqual([3]);
  });

  it('should use strict equality to determine the values to reject', () => {
    const object1 = {a: 1};
    const object2 = {b: 2};
    const array = [object1, object2];

    expect(without(array, {a: 1})).toEqual(array);
    expect(without(array, object1)).toEqual([object2]);
  });

  it('should remove all occurrences of each value from an array', () => {
    expect(without([1, 2, 3, 1, 2, 3], 1, 2)).toEqual([3, 3]);
  });
});
