import {omit} from '.';

// stolen from https://github.com/healthiers/mini-dash
describe('omit()', function () {
  it('should omit single field', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a')).toEqual({b: 2, c: 3});
  });

  it('should omit multiple fields', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a', 'c')).toEqual({b: 2});
  });

  it('should omit all fields', function () {
    expect(omit({a: 1, b: 2, c: 3}, 'a', 'b', 'c')).toEqual({});
  });

  it('should not mutate original object', function () {
    let object = {a: 1, b: 2, c: 3};
    expect(omit(object, 'a', 'b')).toEqual({c: 3});
    expect(object).toEqual({a: 1, b: 2, c: 3});
  });
});
