import { times, uniq } from 'lodash-es';
import { random } from './random';

describe('random()', () => {
  const iterations = 1000;

  it('treats the min as 0 when only provided one integer', () => {
    expect(uniq(times(iterations, () => random(2))).sort()).toEqual([0, 1, 2]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return `0` or `1` when no arguments are given', () => {
    expect(uniq(times(iterations, () => random())).sort()).toEqual([0, 1]);
  });

  it('should support a `min` and `max`', () => {
    for (let i = iterations; --i >= 0; ) {
      const result = random(5, 10);
      expect(result).toBeGreaterThanOrEqual(5);
      expect(result).toBeLessThanOrEqual(10);
    }
  });

  it('should support not providing a `max`', () => {
    for (let i = iterations; --i >= 0; ) {
      const result = random(5);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThanOrEqual(5);
    }
  });

  it('should swap `min` and `max` when `min` > `max`', () => {
    const result = uniq(times(iterations, () => random(4, 2))).sort();
    expect(result).toEqual([2, 3, 4]);
  });

  it('should support large integer values', () => {
    const min = Math.pow(2, 31);
    const max = Math.pow(2, 62);
    for (let i = iterations; --i >= 0; ) {
      const result = random(min, max);
      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });

  it('should support floats', () => {
    const result = random(1.5, 1.6);
    expect(result).toBeGreaterThanOrEqual(1.5);
    expect(result).toBeLessThanOrEqual(1.6);
  });

  it('should support providing a `floating`', () => {
    let result: number;

    result = random(true);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(1);
    expect(result % 1).not.toBe(0);

    result = random(2, true);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(2);
    expect(result % 1).not.toBe(0);

    result = random(2, 4, true);
    expect(result).toBeGreaterThanOrEqual(2);
    expect(result).toBeLessThanOrEqual(4);
    expect(result % 1).not.toBe(0);
  });
});
