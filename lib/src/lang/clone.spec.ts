import {clone} from './clone';

// stolen from https://github.com/healthiers/mini-dash
describe('clone()', function () {
  it('should return an empty object if empty given', function () {
    expect(clone({})).toEqual({});
  });

  it('should return an object with the same properties', function () {
    expect(clone({a: 1, b: 2, c: 3})).toEqual({a: 1, b: 2, c: 3});
  });

  it('should return an object with nested properties', function () {
    expect(clone({a: 1, b: {foo: 'bar'}, c: {bar: 'foo'}}))
      .toEqual({a: 1, b: {foo: 'bar'}, c: {bar: 'foo'}});
  });

  it('should not mutate the original object', function () {
    let object = {a: 1, b: 2, c: 3};
    let result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
  });

  it('should shallow clone', function () {
    let object = {a: 1, b: {foo: 'bar'}, c: {bar: 'foo'}};
    let result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
    expect(result.b).toBe(object.b);
    expect(result.c).toBe(object.c);
  });
});
