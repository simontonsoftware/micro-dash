import {curry} from './curry';
import {bind} from 'lodash';

describe('curry()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should curry based on the number of arguments given', () => {
    function fn(a: number, b: number, c: number, d: number) {
      return Array.prototype.slice.call(arguments);
    }

    const curried = curry(fn);

    expect(curried(1)(2)(3)(4)).toEqual([1, 2, 3, 4]);
    expect(curried(1, 2)(3, 4)).toEqual([1, 2, 3, 4]);
    expect(curried(1, 2, 3, 4)).toEqual([1, 2, 3, 4]);
  });

  it('should allow specifying `arity`', () => {
    function fn(a: number, b: number, c: number, d: number) {
      return Array.prototype.slice.call(arguments);
    }

    const curried = curry(fn, 3);

    expect(curried(1)(2, 3)).toEqual([1, 2, 3]);
    expect(curried(1, 2)(3)).toEqual([1, 2, 3]);
    expect(curried(1, 2, 3)).toEqual([1, 2, 3]);
  });

  it('should provide additional arguments after reaching arity', () => {
    function fn(a: number, b: number, c: number, d: number) {
      return Array.prototype.slice.call(arguments);
    }

    const curried: any = curry(fn, 3);

    expect(curried(1)(2, 3, 4)).toEqual([1, 2, 3, 4]);
    expect(curried(1, 2)(3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(curried(1, 2, 3, 4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('should create a function with a `length` of `0`', () => {
    function fn(a: number, b: number, c: number, d: number) {
      return Array.prototype.slice.call(arguments);
    }

    const curried = curry(fn);

    expect(curried.length).toEqual(0);
    expect(curried(1).length).toEqual(0);
    expect(curried(1, 2).length).toEqual(0);
  });

  it('should use `this` binding of function', () => {
    const object = {a: 1, b: 2, c: 3};
    const expected = [1, 2, 3];
    type Fn = (a: string, b: string, c: string) => number[];

    function fn(this: object | undefined, a: string, b: string, c: string) {
      const value = this || {};
      return [value[a], value[b], value[c]];
    }

    expect(curry(bind(fn, object) as Fn, 3)('a')('b')('c')).toEqual(expected);
    expect(curry(bind(fn, object) as Fn, 3)('a', 'b')('c')).toEqual(expected);
    expect(curry(bind(fn, object) as Fn, 3)('a', 'b', 'c')).toEqual(expected);

    expect(bind(curry(fn), object)('a')('b')('c')).toEqual(Array(3));
    expect(bind(curry(fn), object)('a', 'b')('c')).toEqual(Array(3));
    expect(bind(curry(fn), object)('a', 'b', 'c')).toEqual(expected);
  });

  it('should work for names that shadow `Object.prototype`', () => {
    const curried = curry(
      function hasOwnProperty(a: number, b: number, c: number) {
        return [a, b, c];
      },
    );

    expect(curried(1)(2)(3)).toEqual([1, 2, 3]);
  });
});
