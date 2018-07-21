import { isUndefined } from './is-undefined';

describe('isUndefined', () => {
  it('should return `true` for `undefined`', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return `false` for non `undefined` values', () => {
    // tslint:disable-next-line:only-arrow-functions
    const args = (function(..._: any[]) {
      return arguments;
    })([1, 2, 3]);

    // falsey values
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined('')).toBe(false);

    // all the other things
    expect(isUndefined(args)).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Error())).toBe(false);
    expect(isUndefined(Array.prototype.slice)).toBe(false);
    expect(isUndefined({ a: 1 })).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(/x/)).toBe(false);
    expect(isUndefined('a')).toBe(false);
    expect(isUndefined(Symbol('a'))).toBe(false);
  });
});
