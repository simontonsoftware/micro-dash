import { repeat } from './repeat';

describe('repeat()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const str = 'abc';

  it('should repeat a string `n` times', () => {
    expect(repeat('*', 3)).toBe('***');
    expect(repeat(str, 2)).toBe('abcabc');
  });

  it('should return an empty string if `n` is <= `0`', () => {
    expect(repeat(str, 0)).toBe('');
    expect(repeat(str, -2)).toBe('');
  });

  it('should coerce `n` to an integer', () => {
    expect(repeat(str, 2.6)).toBe('abcabc');
  });

  it('should return an empty string for empty values', () => {
    expect(repeat('', 2)).toBe('');
  });
});
