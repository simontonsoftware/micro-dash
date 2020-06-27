import { expectSingleCallAndReset } from 's-ng-dev-utils';
import { bindKey } from './bind-key';

describe('bindKey()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should work when the target function is overwritten', () => {
    const object = {
      user: 'fred',
      greet(greeting: string): string {
        return this.user + ' says: ' + greeting;
      },
    };

    const bound = bindKey(object, 'greet', 'hi');
    expect(bound()).toBe('fred says: hi');

    object.greet = function (greeting): string {
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
    const obj = { fn(_a: any, _b: any, _c: any): void {} };
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
