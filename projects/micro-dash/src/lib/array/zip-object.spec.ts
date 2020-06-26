import { zipObject } from './zip-object';

describe('zipObject()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const object = { barney: 36, fred: 40 };

  it('should zip together key/value arrays into an object', () => {
    expect(zipObject(['barney', 'fred'], [36, 40])).toEqual(object);
  });

  it('should ignore extra `values`', () => {
    expect(zipObject(['a'], [1, 2])).toEqual({ a: 1 });
  });

  it('should assign `undefined` values for extra `keys`', () => {
    expect(zipObject(['a', 'b'], [1])).toEqual({ a: 1, b: undefined });
  });

  it('should not support deep paths', () => {
    expect(zipObject(['a.b.c'], [1])).toEqual({ 'a.b.c': 1 });
  });
});
