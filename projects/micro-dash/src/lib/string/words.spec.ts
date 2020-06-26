import { mapValues } from '../object/map-values';
import { words } from './words';

describe('words()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should work with compound words', () => {
    expect(words('12ft')).toEqual(['12', 'ft']);
    expect(words('aeiouAreVowels')).toEqual(['aeiou', 'Are', 'Vowels']);
    expect(words('enable 6h format')).toEqual(['enable', '6', 'h', 'format']);
    expect(words('enable 24H format')).toEqual(['enable', '24', 'H', 'format']);
    expect(words('isISO8601')).toEqual(['is', 'ISO', '8601']);
    expect(words('LETTERSAeiouAreVowels')).toEqual([
      'LETTERS',
      'Aeiou',
      'Are',
      'Vowels',
    ]);
    expect(words('tooLegit2Quit')).toEqual(['too', 'Legit', '2', 'Quit']);
    expect(words('walk500Miles')).toEqual(['walk', '500', 'Miles']);
    expect(words('xhr2Request')).toEqual(['xhr', '2', 'Request']);
    expect(words('XMLHttp')).toEqual(['XML', 'Http']);
    expect(words('XmlHTTP')).toEqual(['Xml', 'HTTP']);
    expect(words('XmlHttp')).toEqual(['Xml', 'Http']);
  });

  it('should not treat mathematical operators as words', () => {
    expect(words('\xac')).toEqual([]);
    expect(words('\xb1')).toEqual([]);
    expect(words('\xd7')).toEqual([]);
    expect(words('\xf7')).toEqual([]);
  });

  it('should not treat punctuation as words', () => {
    expect(words('\u2012')).toEqual([]);
    expect(words('\u2013')).toEqual([]);
    expect(words('\u2014')).toEqual([]);
    expect(words('\u2015')).toEqual([]);
    expect(words('\u2024')).toEqual([]);
    expect(words('\u2025')).toEqual([]);
    expect(words('\u2026')).toEqual([]);
    expect(words('\u205d')).toEqual([]);
    expect(words('\u205e')).toEqual([]);
  });

  it('should work as an iteratee for methods like `mapValues`', () => {
    expect(mapValues({ a: '12ft', b: 'aeiouAreVowels' }, words)).toEqual({
      a: ['12', 'ft'],
      b: ['aeiou', 'Are', 'Vowels'],
    });
  });
});
