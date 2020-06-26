import { expectSingleCallAndReset, expectType } from 's-ng-dev-utils';
import { bindKey } from './bind-key';

describe('bindKey()', () => {
  it('has super fancy typing', () => {
    const obj0 = { fn: () => 'hi' };
    expectType<() => string>(bindKey(obj0, 'fn'));

    const obj1 = { fn: (str: string) => Number(str) };
    expectType<(a: string) => number>(bindKey(obj1, 'fn'));
    expectType<() => number>(bindKey(obj1, 'fn', '1'));

    const obj2 = { fn: (a: number, b: string) => a + b };
    expectType<(a: number, b: string) => string>(bindKey(obj2, 'fn'));
    expectType<(b: string) => string>(bindKey(obj2, 'fn', 1));
    expectType<(b: string) => string>(bindKey(obj2, 'fn', 1, '2'));

    const obj3 = { fn: (a: number, b: number, c: string) => a + b + c };
    expectType<(a: number, b: number, c: string) => string>(
      bindKey(obj3, 'fn'),
    );
    expectType<(b: number, c: string) => string>(bindKey(obj3, 'fn', 1));
    expectType<(c: string) => string>(bindKey(obj3, 'fn', 1, 2));
    expectType<() => string>(bindKey(obj3, 'fn', 1, 2, '3'));

    const obj4 = {
      fn: (a: number, b: number, c: number, d: string) => a + b + c + d,
    };
    expectType<(a: number, b: number, c: number, d: string) => string>(
      bindKey(obj4, 'fn'),
    );
    expectType<(b: number, c: number, d: string) => string>(
      bindKey(obj4, 'fn', 1),
    );
    expectType<(c: number, d: string) => string>(bindKey(obj4, 'fn', 1, 2));
    expectType<(d: string) => string>(bindKey(obj4, 'fn', 1, 2, 3));
    expectType<() => string>(bindKey(obj4, 'fn', 1, 2, 3, '4'));

    const obj5 = {
      fn: (a: number, b: number, c: number, d: number, e: string) =>
        a + b + c + d + e,
    };
    expectType<() => string>(bindKey(obj5, 'fn', 1, 2, 3, 4, '5'));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should work when the target function is overwritten', () => {
    const object = {
      user: 'fred',
      greet(greeting: string) {
        return this.user + ' says: ' + greeting;
      },
    };

    const bound = bindKey(object, 'greet', 'hi');
    expect(bound()).toBe('fred says: hi');

    object.greet = function (greeting) {
      return this.user + ' says: ' + greeting + '!';
    };

    expect(bound()).toBe('fred says: hi!');
  });

  it('should bind a function to an object', () => {
    const fn = jasmine.createSpy();
    const object = { fn };
    const bound = bindKey(object, 'fn');

    bound('a');

    expect(fn.calls.mostRecent().object).toBe(object);
    expectSingleCallAndReset(fn, 'a');
  });

  it('should partially apply arguments ', () => {
    const fn = jasmine.createSpy();
    const object = { fn };

    let bound = bindKey(object, 'fn', 'a');
    bound();
    expectSingleCallAndReset(fn, 'a');
    bound('b');
    expectSingleCallAndReset(fn, 'a', 'b');

    bound = bindKey(object, 'fn', 'a', 'b');
    bound();
    expectSingleCallAndReset(fn, 'a', 'b');
    bound('c', 'd');
    expectSingleCallAndReset(fn, 'a', 'b', 'c', 'd');
  });

  it('should create a function with a `length` of `0`', () => {
    const obj = { fn(_a: any, _b: any, _c: any) {} };
    expect(bindKey(obj, 'fn').length).toBe(0);
    expect(bindKey(obj, 'fn', 1).length).toBe(0);
  });

  it('should append array arguments to partially applied arguments', () => {
    const fn = jasmine.createSpy();
    const object = { fn };

    bindKey(object, 'fn', 'a')(['b'], 'c');

    expectSingleCallAndReset(fn, 'a', ['b'], 'c');
  });
});
