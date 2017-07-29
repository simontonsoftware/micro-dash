import {minBy} from './min-by';
import {stub} from 'sinon';
import {identity, range} from 'lodash';

describe('minBy()', () => {

  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    minBy([1, 2, 3], logger);

    expect(logger.args).toEqual([[1], [2], [3]]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    minBy(array, logger);

    expect(logger.args).toEqual([[1], [undefined], [3]]);
  });

  it('should not iterate custom properties of arrays', () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub();

    minBy(array, logger);

    expect(logger.args).toEqual([[1]]);
  });

  it('should ignore changes to `length`', () => {
    const array = [1];
    let count = 0;

    minBy(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
      return 1;
    });

    expect(count).toEqual(1);
  });

  it('should work with extremely large arrays', () => {
    expect(minBy(range(0, 5e5), identity)).toBe(0);
  });

  it('should work with an `iteratee`', () => {
    expect(minBy([1, 2, 3], (n) => -n)).toBe(3);
  });

  it('should work when `iteratee` returns +/-Infinity', () => {
    const value = Infinity;
    const object = {a: value};

    const actual = minBy([object, {a: value}], (obj: { a: number }) => obj.a);

    expect(actual).toBe(object);
  });
});
