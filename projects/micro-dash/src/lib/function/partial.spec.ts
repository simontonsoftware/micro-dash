import { identity } from 'lodash';
import { expectType } from 's-ng-dev-utils';
import { curry } from './curry';
import { partial } from './partial';

describe('partial()', () => {
  it('does not alter the `this` binding', () => {
    function fn(this: any) {
      return this;
    }

    expect(partial(fn.bind(2))()).toBe(2);
    expect(partial(fn)()).toBe(undefined);
  });

  it('sets the `length` property', () => {
    const fn = (_a: any, _b: any, _c: any) => {};

    expect(partial(fn).length).toBe(3);
    expect(partial(fn, 1).length).toBe(2);
    expect(partial(fn, 1, 2).length).toBe(1);
    expect(partial(fn, 1, 2, 3).length).toBe(0);
  });

  it('has super fancy typing', () => {
    const fn0 = () => 'hi';
    expectType<() => string>(partial(fn0));

    const fn1 = (str: string) => Number(str);
    expectType<(a: string) => number>(partial(fn1));
    expectType<() => number>(partial(fn1, '1'));

    const fn2 = (a: number, b: string) => a + b;
    expectType<(a: number, b: string) => string>(partial(fn2));
    expectType<(b: string) => string>(partial(fn2, 1));
    expectType<(b: string) => string>(partial(fn2, 1, '2'));

    const fn3 = (a: number, b: number, c: string) => a + b + c;
    expectType<(a: number, b: number, c: string) => string>(partial(fn3));
    expectType<(b: number, c: string) => string>(partial(fn3, 1));
    expectType<(c: string) => string>(partial(fn3, 1, 2));
    expectType<() => string>(partial(fn3, 1, 2, '3'));

    const fn4 = (a: number, b: number, c: number, d: string) => a + b + c + d;
    expectType<(a: number, b: number, c: number, d: string) => string>(
      partial(fn4),
    );
    expectType<(b: number, c: number, d: string) => string>(partial(fn4, 1));
    expectType<(c: number, d: string) => string>(partial(fn4, 1, 2));
    expectType<(d: string) => string>(partial(fn4, 1, 2, 3));
    expectType<() => string>(partial(fn4, 1, 2, 3, '4'));

    const fn5 = (a: number, b: number, c: number, d: number, e: string) =>
      a + b + c + d + e;
    expectType<() => string>(partial(fn5, 1, 2, 3, 4, '5'));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('partially applies arguments', () => {
    expect(partial(identity as (value: string) => string, 'a')()).toBe('a');
  });

  it('creates a function that can be invoked with additional arguments', () => {
    const fn = (a: string, b: string) => [a, b];

    const par = partial(fn, 'a');

    expect(par('b')).toEqual(['a', 'b']);
  });

  it('works when there are no partially applied arguments and the created function is invoked without additional arguments', () => {
    // tslint:disable-next-line:only-arrow-functions
    const fn = function () {
      return arguments.length;
    };

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
    const fn = (a: number, b: number, c: number) => a + b + c;
    const curried = curry(partial(fn, 1), 2);

    expect(curried(2, 3)).toBe(6);
    expect(curried(2)(3)).toBe(6);
  });
});
