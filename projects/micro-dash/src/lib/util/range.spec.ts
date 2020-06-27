import { range } from './range';

describe('range()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should infer the sign of `step` when only `end` is given', () => {
    expect(range(4)).toEqual([0, 1, 2, 3]);
    expect(range(-4)).toEqual([0, -1, -2, -3]);
  });

  it('should infer the sign of `step` when only `start` and `end` are given', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4]);
    expect(range(5, 1)).toEqual([5, 4, 3, 2]);
  });

  it('should work with a `start`, `end`, and `step`', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
    expect(range(5, 1, -1)).toEqual([5, 4, 3, 2]);
    expect(range(0, 20, 5)).toEqual([0, 5, 10, 15]);
  });

  it('should support a `step` of `0`', () => {
    expect(range(1, 4, 0)).toEqual([1, 1, 1]);
  });

  it('should work with a `step` larger than `end`', () => {
    expect(range(1, 5, 20)).toEqual([1]);
  });

  it('should work with a negative `step`', () => {
    expect(range(0, -4, -1)).toEqual([0, -1, -2, -3]);
    expect(range(21, 10, -3)).toEqual([21, 18, 15, 12]);
  });

  it('should support `start` of `-0`', () => {
    expect(range(-0, 1)).toEqual([0]);
  });

  it('should coerce arguments to finite numbers', () => {
    expect(range(NaN)).toEqual([]);
    expect(range(NaN, NaN)).toEqual([]);
  });
});
