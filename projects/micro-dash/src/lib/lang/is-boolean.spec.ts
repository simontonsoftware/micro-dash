import { isBoolean } from './is-boolean';

describe('isBoolean()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return `true` for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  // tslint:disable-next-line:only-arrow-functions
  it('should return `false` for non-booleans', function () {
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean(NaN)).toBe(false);
    expect(isBoolean('')).toBe(false);
    expect(isBoolean(arguments)).toBe(false);
    expect(isBoolean([1, 2, 3])).toBe(false);
    expect(isBoolean(new Date())).toBe(false);
    expect(isBoolean(new Error())).toBe(false);
    expect(isBoolean(Array.prototype.slice)).toBe(false);
    expect(isBoolean({ a: 1 })).toBe(false);
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(/x/)).toBe(false);
    expect(isBoolean('a')).toBe(false);
    expect(isBoolean(Symbol('a'))).toBe(false);
  });
});
