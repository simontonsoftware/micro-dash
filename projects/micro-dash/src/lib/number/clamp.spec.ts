import {clamp} from './clamp';

describe('clamp()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should clamp negative numbers', () => {
    expect(clamp(-10, -5, 5)).toBe(-5);
    expect(clamp(-10.2, -5.5, 5.5)).toBe(-5.5);
    expect(clamp(-Infinity, -5, 5)).toBe(-5);
  });

  it('should clamp positive numbers', () => {
    expect(clamp(10, -5, 5)).toBe(5);
    expect(clamp(10.6, -5.6, 5.4)).toBe(5.4);
    expect(clamp(Infinity, -5, 5)).toBe(5);
  });

  it('should not alter negative numbers in range', () => {
    expect(clamp(-4, -5, 5)).toBe(-4);
    expect(clamp(-5, -5, 5)).toBe(-5);
    expect(clamp(-5.5, -5.6, 5.6)).toBe(-5.5);
  });

  it('should not alter positive numbers in range', () => {
    expect(clamp(4, -5, 5)).toBe(4);
    expect(clamp(5, -5, 5)).toBe(5);
    expect(clamp(4.5, -5.1, 5.2)).toBe(4.5);
  });

  it('should not alter `0` in range', () => {
    expect(1 / clamp(0, -5, 5)).toBe(Infinity);
  });

  it('should clamp to `0`', () => {
    expect(1 / clamp(-10, 0, 5)).toBe(Infinity);
  });

  it('should not alter `-0` in range', () => {
    expect(1 / clamp(-0, -5, 5)).toBe(-Infinity);
  });

  it('should clamp to `-0`', () => {
    expect(1 / clamp(-10, -0, 5)).toBe(-Infinity);
  });

  it('should return `NaN` when `number` is `NaN`', () => {
    expect(clamp(NaN, -5, 5)).toEqual(NaN);
  });
});
