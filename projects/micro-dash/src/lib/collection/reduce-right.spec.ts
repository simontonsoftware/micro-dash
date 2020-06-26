import { identity } from 'lodash-es';
import { stub } from 'sinon';
import { reduceRight } from './reduce-right';

describe('reduceRight()', () => {
  it('works with `undefined`', () => {
    expect(reduceRight(undefined, () => 1, 2)).toEqual(2);
    expect(reduceRight(undefined, () => 1)).toBeUndefined();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should use the last element as the `accumulator`', () => {
    expect(reduceRight([1, 2, 3], identity)).toEqual(3);
  });

  it('should provide correct `iteratee` arguments for an array', () => {
    const logger = stub().returns(7);
    reduceRight([1, 2, 3], logger, 0);
    expect(logger.args).toEqual([
      [0, 3, 2],
      [7, 2, 1],
      [7, 1, 0],
    ]);

    logger.resetHistory();
    reduceRight([1, 2, 3], logger);
    expect(logger.args).toEqual([
      [3, 2, 1],
      [7, 1, 0],
    ]);
  });

  it('should provide correct `iteratee` arguments for an object', () => {
    const logger = stub().returns(7);
    reduceRight({ a: 1, b: 2 }, logger, 0);
    expect(logger.args).toEqual([
      [0, 2, 'b'],
      [7, 1, 'a'],
    ]);

    logger.resetHistory();
    reduceRight({ a: 1, b: 2 }, logger);
    expect(logger.args).toEqual([[2, 1, 'a']]);
  });
});
