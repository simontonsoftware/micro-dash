import { expectCallsAndReset } from 's-ng-dev-utils';
import { stub } from 'sinon';
import { identity } from '../util';
import { map } from './map';

describe('map()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should provide correct iteratee arguments', () => {
    const spy = jasmine.createSpy();
    map([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, 0]);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [1];
    array[2] = 3;
    const spy = jasmine.createSpy();

    map(array, spy);

    expectCallsAndReset(spy, [1, 0], [undefined, 1], [3, 2]);
  });

  it('should not iterate custom properties of arrays', () => {
    const array = [1];
    (array as any).a = 1;
    const spy = jasmine.createSpy();

    map(array, spy);

    expectCallsAndReset(spy, [1, 0]);
  });

  it('iterates over own string keyed properties of objects', () => {
    const object = { a: 1 };
    const spy = jasmine.createSpy();

    map(object, spy);

    expectCallsAndReset(spy, [1, 'a']);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return true;
    });

    map(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    map(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should map values in `collection` to a new array', () => {
    expect(map({ a: 1, b: 2 }, identity)).toEqual([1, 2]);
    expect(map([1, 2], identity)).toEqual([1, 2]);
  });

  it('should accept `undefined` for `collection`', () => {
    const logger = stub();
    expect(map(undefined, logger)).toEqual([]);
    expect(logger.callCount).toBe(0);
  });

  it('should work with objects with non-number length properties', () => {
    expect(map({ length: { value: 'x' } }, identity)).toEqual([{ value: 'x' }]);
  });
});
