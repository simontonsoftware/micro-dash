import { castArray } from './cast-array';

describe('castArray()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should wrap non-array items in an array', () => {
    expect(castArray(false)).toEqual([false]);
    expect(castArray(0)).toEqual([0]);
    expect(castArray('')).toEqual(['']);
    expect(castArray(null)).toEqual([null]);
    expect(castArray(undefined)).toEqual([undefined]);
    expect(castArray(NaN)).toEqual([NaN]);
    expect(castArray(true)).toEqual([true]);
    expect(castArray(1)).toEqual([1]);
    expect(castArray('a')).toEqual(['a']);
    expect(castArray({ a: 1 })).toEqual([{ a: 1 }]);
  });

  it('should return array values by reference', () => {
    const array = [1];
    expect(castArray(array)).toBe(array);
  });
});
