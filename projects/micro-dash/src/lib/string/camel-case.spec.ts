import {camelCase} from './camel-case';

describe('camelCase()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should convert `string` to camel case', () => {
    const strings = [
      'foo bar', 'Foo bar', 'foo Bar', 'Foo Bar',
      'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'
    ];

    for (const string of strings) {
      expect(camelCase(string)).toBe('fooBar');
    }
  });

  it('should handle double-converting strings', () => {
    const strings = [
      'foo bar', 'Foo bar', 'foo Bar', 'Foo Bar',
      'FOO BAR', 'fooBar', '--foo-bar--', '__foo_bar__'
    ];

    for (const string of strings) {
      expect(camelCase(camelCase(string))).toBe('fooBar');
    }
  });

  it('should remove Latin mathematical operators', () => {
    expect(camelCase('\xd7')).toBe('');
    expect(camelCase('\xf7')).toBe('');
  });

  it('should work with numbers', () => {
    expect(camelCase('12 feet')).toBe('12Feet');
    expect(camelCase('enable 6h format')).toBe('enable6HFormat');
    expect(camelCase('enable 24H format')).toBe('enable24HFormat');
    expect(camelCase('too legit 2 quit')).toBe('tooLegit2Quit');
    expect(camelCase('walk 500 miles')).toBe('walk500Miles');
    expect(camelCase('xhr2 request')).toBe('xhr2Request');
  });

  it('should handle acronyms', () => {
    expect(camelCase('safe HTML')).toBe('safeHtml');
    expect(camelCase('safeHTML')).toBe('safeHtml');
    expect(camelCase('escape HTML entities')).toBe('escapeHtmlEntities');
    expect(camelCase('escapeHTMLEntities')).toBe('escapeHtmlEntities');
    expect(camelCase('XMLHttpRequest')).toBe('xmlHttpRequest');
    expect(camelCase('XmlHTTPRequest')).toBe('xmlHttpRequest');
  });

  it('should return an empty string for empty values', () => {
    expect(camelCase('')).toBe('');
  });
});
