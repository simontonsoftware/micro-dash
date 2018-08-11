import { kebabCase } from './kebab-case';

describe('kebabCase()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should convert `string` to kebab case', () => {
    const strings = [
      'foo bar',
      'Foo bar',
      'foo Bar',
      'Foo Bar',
      'FOO BAR',
      'fooBar',
      '--foo-bar--',
      '__foo_bar__',
    ];

    for (const string of strings) {
      expect(kebabCase(string)).toBe('foo-bar');
    }
  });

  it('should handle double-converting strings', () => {
    const strings = [
      'foo bar',
      'Foo bar',
      'foo Bar',
      'Foo Bar',
      'FOO BAR',
      'fooBar',
      '--foo-bar--',
      '__foo_bar__',
    ];

    for (const string of strings) {
      expect(kebabCase(kebabCase(string))).toBe('foo-bar');
    }
  });

  it('should remove Latin mathematical operators', () => {
    expect(kebabCase('\xd7')).toBe('');
    expect(kebabCase('\xf7')).toBe('');
  });

  it('should return an empty string for empty values', () => {
    expect(kebabCase('')).toBe('');
  });
});
