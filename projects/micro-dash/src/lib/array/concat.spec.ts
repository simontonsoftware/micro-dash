import { concat } from './concat';

describe('concat()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should shallow clone `array`', () => {
    const array = [1, 2, 3];
    const actual = concat(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it('should concat arrays and values', () => {
    const array: Array<number | number[]> = [1];
    const actual = concat(array, 2, [3], [[4]]);

    expect(actual).toEqual([1, 2, 3, [4]]);
    expect(array).toEqual([1]);
  });
});
