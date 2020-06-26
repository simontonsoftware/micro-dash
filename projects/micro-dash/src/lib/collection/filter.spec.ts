import { expectCallsAndReset } from 's-ng-dev-utils';
import { filter } from './filter';

describe('filter()', () => {
  it('works for objects', () => {
    const object = { a: 1, b: 2, c: 3 };
    expect(filter(object, (item) => item === 2)).toEqual([2]);
    expect(filter(object, (_item, key) => key === 'b')).toEqual([2]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return elements `predicate` returns truthy for', () => {
    expect(filter([1, 2, 3], (item) => item === 2)).toEqual([2]);
  });

  it('should provide correct iteratee arguments', () => {
    const spy = jasmine.createSpy();
    filter([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, 0]);
  });

  it('should treat sparse arrays as dense', () => {
    const array = [1];
    array[2] = 3;
    const spy = jasmine.createSpy();

    filter(array, spy);

    expectCallsAndReset(spy, [1, 0], [undefined, 1], [3, 2]);
  });

  it('should not iterate custom properties of arrays', () => {
    const array = [1];
    (array as any).a = 1;
    const spy = jasmine.createSpy();

    filter(array, spy);

    expectCallsAndReset(spy, [1, 0]);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return true;
    });

    filter(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    filter(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should accept falsey arguments', () => {
    expect(filter(null, () => true)).toEqual([]);
    expect(filter(undefined, () => true)).toEqual([]);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = filter(array, () => true);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
