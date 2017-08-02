import {forOwnRight} from './for-own-right';
import {stub} from 'sinon';
import {noop} from 'lodash';

describe('forOwnRight()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should iterate over `length` properties', () => {
    const logger = stub();

    forOwnRight({0: 'zero', 1: 'one', length: 2}, logger);

    expect(logger.args).toContain([2, 'length']);
  });

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    forOwnRight([1, 2, 3], logger);

    expect(logger.args).toEqual([[3, 'length'], [3, '2'], [2, '1'], [1, '0']]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    forOwnRight(array, logger);

    expect(logger.args).toEqual([[3, 'length'], [3, '2'], [1, '0']]);
  });

  it('should return the collection', () => {
    const array = [1, 2, 3];

    expect(forOwnRight(array, noop)).toBe(array);
  });

  it('should ignore added `object` properties', () => {
    const object: any = {a: 1};
    let count = 0;

    forOwnRight(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });
});
