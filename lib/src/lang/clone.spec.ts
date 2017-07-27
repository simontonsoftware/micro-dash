import {clone} from './clone';
import {forOwn, isObject} from 'lodash';

describe('clone()', function () {

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

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

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should perform a shallow clone', () => {
    const array = [{a: 0}, {b: 1}];

    const actual = clone(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
    expect(actual[0]).toBe(array[0]);
  });

  const clonable = {
    'arrays': ['a', ''],
    'array-like objects': {'0': 'a', 'length': 1},
    'objects': {'a': 0, 'b': 1, 'c': 2},
    'objects with object values': {'a': /a/, 'b': ['B'], 'c': {'C': 1}},
    'properties that shadow those on `Object.prototype`': {
      'constructor': Object.prototype.constructor,
      'hasOwnProperty': Object.prototype.hasOwnProperty,
      'isPrototypeOf': Object.prototype.isPrototypeOf,
      'propertyIsEnumerable': Object.prototype.propertyIsEnumerable,
      'toLocaleString': Object.prototype.toLocaleString,
      'toString': Object.prototype.toString,
      'valueOf': Object.prototype.valueOf
    },
  };
  forOwn(clonable, (object, kind) => {
    it('should clone ' + kind, () => {
      const actual = clone(object);

      expect(actual).toEqual(object);
      expect(actual).not.toBe(object);
    });
  });
});
