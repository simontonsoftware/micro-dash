import { toString } from './to-string';

describe('toString()', () => {
  it('works', () => {
    expect(toString('already a string')).toBe('already a string');
    expect(toString('')).toBe('');
    expect(toString(1)).toBe('1');
    expect(toString([1, 2, 3])).toBe('1,2,3');
    expect(toString([undefined, null])).toBe(',');
    expect(toString({ hi: 'there' })).toBe('[object Object]');
    expect(toString({ toString: () => 'custom toString()' })).toBe(
      'custom toString()',
    );
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('treats nullish values as empty strings', () => {
    expect(toString(null)).toBe('');
    expect(toString(undefined)).toBe('');
    expect(toString([undefined, null, undefined, null])).toBe(',,,');
  });
});
