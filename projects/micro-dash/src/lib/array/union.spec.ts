import { union } from './union';

describe('union()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the union of two arrays', () => {
    expect(union([2], [1, 2])).toEqual([2, 1]);
  });

  it('should return the union of multiple arrays', () => {
    expect(union([2], [1, 2], [2, 3])).toEqual([2, 1, 3]);
  });

  it('should not flatten nested arrays', () => {
    expect(union([1, 3, 2], [1, [5]], [2, [4]])).toEqual([1, 3, 2, [5], [4]]);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = union(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
