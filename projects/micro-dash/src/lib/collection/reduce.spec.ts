import { identity } from 'lodash';
import { reduce, reduceRight } from './reduce';
import { stub } from 'sinon';

describe('reduce()', () => {
  it('works with `undefined`', () => {
    expect(reduce(undefined, () => 1, 2)).toEqual(2);
    expect(reduce(undefined, () => 1)).toBeUndefined();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should use the first element as the `accumulator`', () => {
    expect(reduce([1, 2, 3], identity)).toEqual(1);
  });

  it('should provide correct `iteratee` arguments for an array', () => {
    const logger = stub().returns(7);
    reduce([1, 2, 3], logger, 0);
    expect(logger.args).toEqual([[0, 1, 0], [7, 2, 1], [7, 3, 2]]);

    logger.resetHistory();
    reduce([1, 2, 3], logger);
    expect(logger.args).toEqual([[1, 2, 1], [7, 3, 2]]);
  });

  it('should provide correct `iteratee` arguments for an object', () => {
    const logger = stub().returns(7);
    reduce({ a: 1, b: 2 }, logger, 0);
    expect(logger.args).toEqual([[0, 1, 'a'], [7, 2, 'b']]);

    logger.resetHistory();
    reduce({ a: 1, b: 2 }, logger);
    expect(logger.args).toEqual([[1, 2, 'b']]);
  });
});

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
    expect(logger.args).toEqual([[0, 3, 2], [7, 2, 1], [7, 1, 0]]);

    logger.resetHistory();
    reduceRight([1, 2, 3], logger);
    expect(logger.args).toEqual([[3, 2, 1], [7, 1, 0]]);
  });

  it('should provide correct `iteratee` arguments for an object', () => {
    const logger = stub().returns(7);
    reduceRight({ a: 1, b: 2 }, logger, 0);
    expect(logger.args).toEqual([[0, 2, 'b'], [7, 1, 'a']]);

    logger.resetHistory();
    reduceRight({ a: 1, b: 2 }, logger);
    expect(logger.args).toEqual([[2, 1, 'a']]);
  });
});
