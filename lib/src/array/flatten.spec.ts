import {flatten} from '.';

// stolen from https://github.com/healthiers/mini-dash
describe('flatten()', function () {
  it('should return empty array', function () {
    expect(flatten([])).toEqual([]);
  });

  it('should flatten uniform length arrays', function () {
    expect(flatten([[1], [2], [3]])).toEqual([1, 2, 3]);
  });

  it('should return different lenth arrays', function () {
    expect(flatten([[1, 2, 3], [4], [5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should not modify original array', function () {
    let array = [[1, 2, 3], [4], [5, 6]];
    let flattened = flatten(array);

    expect(flattened).toEqual([1, 2, 3, 4, 5, 6]);
    expect(array).toEqual([[1, 2, 3], [4], [5, 6]]);
  });
});
