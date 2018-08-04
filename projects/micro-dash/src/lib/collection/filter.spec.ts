import { stub } from 'sinon';
import { filter } from './filter';

describe('filter()', () => {
  it('works for objects', () => {
    const object = {a: 1, b: 2, c: 3};
    expect(filter(object, (item, key) => item === 2)).toEqual([2]);
    expect(filter(object, (item, key) => key === 'b')).toEqual([2]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return elements `predicate` returns truthy for', () => {
    expect(filter([1, 2, 3], (item) => item === 2)).toEqual([2]);
  });

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    filter([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    filter(array, logger);

    expect(logger.args).toEqual([[1, 0], [undefined, 1], [3, 2]]);
  });

  it('should not iterate custom properties of arrays', () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub();

    filter(array, logger);

    expect(logger.args).toEqual([[1, 0]]);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    let count = 0;

    filter(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
      return false;
    });

    expect(count).toEqual(1);
  });

  it('should ignore added `object` properties', () => {
    const object: any = {a: 1};
    let count = 0;

    filter(object, () => {
      object.b = 2;
      ++count;
      return false;
    });

    expect(count).toEqual(1);
  });
});
