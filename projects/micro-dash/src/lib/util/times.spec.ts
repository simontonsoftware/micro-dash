import {stub} from 'sinon';
import {times} from './times';

describe('times()', () => {
  it('handles n=0', () => {
    const logger = stub();

    const result = times(0, logger);

    expect(result).toEqual([]);
    expect(logger.args).toEqual([]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should provide correct `iteratee` arguments', () => {
    const logger = stub();

    times(1, logger);

    expect(logger.args).toEqual([[0]]);
  });

  it('should return an array of the results of each `iteratee` execution', () => {
    expect(times(3, (i) => 2 * i)).toEqual([0, 2, 4]);
  });
});
