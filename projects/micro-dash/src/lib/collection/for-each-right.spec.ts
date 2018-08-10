import { forEachRight } from './for-each-right';
import { stub } from 'sinon';
import { noop } from 'lodash';

describe('forEachRight()', () => {
  it('works for null & undefined', () => {
    const spy = jasmine.createSpy();
    forEachRight(null, spy);
    forEachRight(undefined, spy);
    expect(spy).not.toHaveBeenCalled();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('can exit early when iterating arrays', () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forEachRight([1, 2, 3, 4], logger);

    expect(logger.args).toEqual([[4, 3], [3, 2], [2, 1]]);
  });

  it('can exit early when iterating objects', () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forEachRight({ a: 1, b: 2, c: 3, d: 4 }, logger);

    expect(logger.args).toEqual([[4, 'd'], [3, 'c'], [2, 'b']]);
  });

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    forEachRight([1, 2, 3], logger);

    expect(logger.args).toEqual([[3, 2], [2, 1], [1, 0]]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    forEachRight(array, logger);

    expect(logger.args).toEqual([[3, 2], [undefined, 1], [1, 0]]);
  });

  it('should not iterate custom properties', () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub();

    forEachRight(array, logger);

    expect(logger.args).toEqual([[1, 0]]);
  });

  it('iterates over own string keyed properties of objects', () => {
    function Foo(this: any) {
      this.a = 1;
    }

    Foo.prototype.b = 2;
    const logger = stub();

    forEachRight(new (Foo as any)(), logger);

    expect(logger.args).toEqual([[1, 'a']]);
  });

  it('should return the collection', () => {
    const array = [1, 2, 3];

    expect(forEachRight(array, noop)).toBe(array);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    let count = 0;

    forEachRight(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
    });

    expect(count).toEqual(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = { a: 1 };
    let count = 0;

    forEachRight(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });
});
