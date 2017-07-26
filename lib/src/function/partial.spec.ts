import {identity} from 'lodash';
import {partial} from './partial';
import {curry} from './curry';

describe('partial()', () => {

  it('does not alter the `this` binding', () => {
    function fn(this: any) {
      return this;
    }

    expect(partial(fn.bind(2))()).toBe(2);
    expect(partial(fn)()).toBe(undefined);
  });

  it('sets the `length` property', () => {
    const fn = function(a: any, b: any, c: any) {};

    expect(partial(fn).length).toBe(3);
    expect(partial(fn, 1).length).toBe(2);
    expect(partial(fn, 1, 2).length).toBe(1);
    expect(partial(fn, 1, 2, 3).length).toBe(0);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('partially applies arguments', () => {
    expect(partial(identity as (value: string) => string, 'a')()).toBe('a');
  });

  it('creates a function that can be invoked with additional arguments', () => {
    const fn = function(a: string, b: string) { return [a, b]; };

    const par = partial(fn, 'a');

    expect(par('b')).toEqual(['a', 'b']);
  });

  it('works when there are no partially applied arguments and the created function is invoked without additional arguments', () => {
    const fn = function() { return arguments.length; };

    const par = partial(fn);

    expect(par()).toBe(0);
  });

  it('works when there are no partially applied arguments and the created function is invoked with additional arguments', () => {
    expect(partial(identity as (value: string) => string)('a')).toBe('a');
  });

  it('should ensure `new par` is an instance of `func`', () => {
    const object = {};
    function Foo(value = false) {
      return value && object;
    }

    const par = partial(Foo);

    expect(new (par as any)() instanceof Foo).toBeTruthy();
    expect(new (par as any)(true)).toBe(object);
  });

  it('should clone metadata for created functions', () => {
    function greet(greeting: string, name: string) {
      return greeting + ' ' + name;
    }

    const par1 = partial(greet, 'hi');
    const par2 = partial(par1, 'barney');
    const par3 = partial(par1, 'pebbles');

    expect(par1('fred')).toBe('hi fred');
    expect(par2()).toBe('hi barney');
    expect(par3()).toBe('hi pebbles');
  });

  it('should work with curried functions', () => {
    const fn = function(a: number, b: number, c: number) { return a + b + c; };
    const curried = curry(partial(fn, 1), 2);

    expect(curried(2, 3)).toBe(6);
    expect(curried(2)(3)).toBe(6);
  });
});
