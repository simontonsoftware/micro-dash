import {merge} from './';
import {reduce} from '../collection/reduce';

describe('merge()', function () {

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

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
    let first: { a: number, b?: number, c?: number } = {a: 1};
    let second = {b: 2};
    let third = {c: 3};

    expect(merge(first, second, third)).toEqual({a: 1, b: 2, c: 3});

    expect(first).toEqual({a: 1, b: 2, c: 3});
    expect(second).toEqual({b: 2});
    expect(third).toEqual({c: 3});
  });

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should throws strict mode errors', () => {
    const object = Object.freeze({a: undefined});
    expect(() => {
      merge(object, {a: 1});
    }).toThrowError(/^Cannot assign to read only property/);
  });

  it('should work as an iteratee for methods like `reduce`', () => {
    expect(reduce([{a: 1}, {b: 2}, {c: 3}], merge, {a: '0'}))
      .toEqual({a: 1, b: 2, c: 3});
  });

  it('should not assign values that are the same as their destinations', () => {
    const object = {};
    for (const value of [['a'], {a: 1}]) {
      Object.defineProperty(object, 'a', {
        configurable: true,
        enumerable: true,
        get: () => value,
        set: function (v: any) { fail('tried to set "a" to ' + v); },
      });

      merge(object, {a: value});
    }
  });

  it('should merge `source` into `object`', () => {
    const names = {
      characters: [
        {name: 'barney'},
        {name: 'fred'},
      ],
    };
    const ages = {
      characters: [
        {age: 36},
        {age: 40},
      ],
    };
    const heights = {
      characters: [
        {height: '5\'4"'},
        {height: '5\'5"'},
      ],
    };
    const expected = {
      characters: [
        {name: 'barney', age: 36, height: '5\'4"'},
        {name: 'fred', age: 40, height: '5\'5"'},
      ],
    };

    expect(merge(names, ages, heights)).toEqual(expected);
  });

  it('should work with four arguments', () => {
    expect(merge({a: 1}, {a: 2}, {a: 3}, {a: 4})).toEqual({a: 4});
  });

  it('should assign `null` values', () => {
    expect(merge({a: 1}, {a: null})).toEqual({a: null} as any);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [1];
    array[2] = 3;

    const actual = merge([], array);

    expect('1' in actual).toBeTruthy();
    expect(actual as any).toEqual([1, undefined, 3]);
  });

  it('should not augment source objects', () => {
    let source1: any = {a: [{a: 1}]};
    let source2: any = {a: [{b: 2}]};
    let actual: any = merge({}, source1, source2);
    expect(source1.a).toEqual([{a: 1}]);
    expect(source2.a).toEqual([{b: 2}]);
    expect(actual.a).toEqual([{a: 1, b: 2}]);

    source1 = {a: [[1, 2, 3]]};
    source2 = {a: [[3, 4]]};
    actual = merge({}, source1, source2);
    expect(source1.a).toEqual([[1, 2, 3]]);
    expect(source2.a).toEqual([[3, 4]]);
    expect(actual.a).toEqual([[3, 4, 3]]);
  });
});
