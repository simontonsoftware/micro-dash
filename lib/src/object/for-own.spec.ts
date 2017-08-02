import {forOwn} from './for-own';
import {stub} from 'sinon';
import {noop} from 'lodash';

describe('forOwn()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should iterate over `length` properties', () => {
    const logger = stub();

    forOwn({0: 'zero', 1: 'one', length: 2}, logger);

    expect(logger.args).toEqual([['zero', '0'], ['one', '1'], [2, 'length']]);
  });

  it('should provide correct iteratee arguments', () => {
    const logger = stub();

    forOwn([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, '0'], [2, '1'], [3, '2'], [3, 'length']]);
  });

  it('should treat sparse arrays as dense', () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    forOwn(array, logger);

    expect(logger.args).toEqual([[1, '0'], [3, '2'], [3, 'length']]);
  });

  it('should return the collection', () => {
    const array = [1, 2, 3];

    expect(forOwn(array, noop)).toBe(array);
  });

  it('should ignore added `object` properties', () => {
    const object: any = {a: 1};
    let count = 0;

    forOwn(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });
});
