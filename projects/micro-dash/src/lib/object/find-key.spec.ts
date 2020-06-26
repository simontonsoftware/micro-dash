import { matches } from 'lodash-es';
import { expectSingleCallAndReset } from 's-ng-dev-utils';
import { findKey } from './find-key';

describe('findKey()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const objects = [
    { a: 0, b: 0 },
    { a: 1, b: 1 },
    { a: 2, b: 2 },
  ];

  it('should return the found value', () => {
    expect(findKey(objects, (object) => !!object.a)).toBe('1');
  });

  it('should return `undefined` if value is not found', () => {
    expect(findKey(objects, (object) => object.a === 3)).toBe(undefined);
  });

  it('should return `undefined` for empty collections', () => {
    expect(findKey({}, matches({ a: 3 }))).toBe(undefined);
    expect(findKey([], matches({ a: 3 }))).toBe(undefined);
    expect(findKey(false, matches({ a: 3 }))).toBe(undefined);
    expect(findKey(0, matches({ a: 3 }))).toBe(undefined);
    expect(findKey('', matches({ a: 3 }))).toBe(undefined);
    expect(findKey(null, matches({ a: 3 }))).toBe(undefined);
    expect(findKey(undefined, matches({ a: 3 }))).toBe(undefined);
    expect(findKey(NaN, matches({ a: 3 }))).toBe(undefined);
  });

  it('should work with an object for `collection`', () => {
    expect(findKey({ a: 1, b: 2, c: 3 }, (n) => n < 3)).toBe('a');
  });

  it('should provide correct `predicate` arguments for objects', () => {
    const spy = jasmine.createSpy();
    findKey({ a: 1 }, spy);
    expectSingleCallAndReset(spy, 1, 'a');
  });

  it('should provide correct iteratee arguments', () => {
    const spy = jasmine.createSpy();
    findKey([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, '0']);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    findKey(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return false;
    });

    findKey(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
