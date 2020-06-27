import { identity, range } from 'lodash';
import { expectCallsAndReset } from 's-ng-dev-utils';
import { maxBy } from './max-by';

describe('maxBy()', () => {
  it('can sort by any primitive', () => {
    expect(maxBy([0, 1, -1], identity)).toBe(1);
    expect(maxBy([false, true, false], identity)).toBe(true);
    expect(maxBy(['b', 'c', 'a'], identity)).toBe('c');
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should provide correct iteratee arguments', () => {
    const spy = jasmine.createSpy();
    maxBy([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1]);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [1];
    array[2] = 3;
    const spy = jasmine.createSpy().and.returnValue(true);

    maxBy(array, spy);

    expectCallsAndReset(spy, [1], [undefined], [3]);
  });

  it('should not iterate custom properties of arrays', () => {
    const array = [1];
    (array as any).a = 1;
    const spy = jasmine.createSpy();

    maxBy(array, spy);

    expectCallsAndReset(spy, [1]);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return true;
    });

    maxBy(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should work with extremely large arrays', () => {
    expect(maxBy(range(0, 5e5), identity)).toBe(499999);
  });

  it('should work with an `iteratee`', () => {
    expect(maxBy([1, 2, 3], (n) => -n)).toBe(1);
  });

  it('should work when `iteratee` returns +/-Infinity', () => {
    const value = -Infinity;
    const object = { a: value };

    const actual = maxBy([object, { a: value }], (obj: { a: number }) => obj.a);

    expect(actual).toBe(object);
  });
});
