import {merge} from '.';

describe('merge()', function () {
  it('should return empty object when single empty object given', function () {
    expect(merge({})).toEqual({});
  });

  it('should return empty object when multiple empty objects given', function () {
    expect(merge({}, {}, {})).toEqual({});
  });

  it('should return the union of 2 properties', function () {
    expect(merge({a: 1}, {b: 2})).toEqual({a: 1, b: 2});
  });

  it('should return the union of 3 properties', function () {
    expect(merge({a: 1}, {b: 2}, {c: 3})).toEqual({a: 1, b: 2, c: 3});
  });

  it('should have the rightmost property', function () {
    expect(merge({a: 1}, {a: 2}, {a: 3})).toEqual({a: 3});
  });

  it('should mutate (only) the first input', function () {
    let first = {a: 1};
    let second = {b: 2};
    let third = {c: 3};

    expect(merge(first, second, third)).toEqual({a: 1, b: 2, c: 3});

    expect(first).toEqual({a: 1, b: 2, c: 3});
    expect(second).toEqual({b: 2});
    expect(third).toEqual({c: 3});
  });
});
