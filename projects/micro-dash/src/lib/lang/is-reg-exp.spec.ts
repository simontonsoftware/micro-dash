import { isRegExp } from './is-reg-exp';

describe('isRegExp()', () => {
  // declared to be different than lodash. if this changes, update the documentation
  it('should return `false` for subclassed values', () => {
    function Foo(): void {}
    Foo.prototype = RegExp.prototype;
    expect(isRegExp(new (Foo as any)())).toBe(true);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return `true` for regexes', () => {
    expect(isRegExp(/x/)).toBe(true);
    expect(isRegExp(RegExp('x'))).toBe(true);
  });

  // tslint:disable-next-line:only-arrow-functions
  it('should return `false` for non-regexes', function (): void {
    expect(isRegExp(null)).toBe(false);
    expect(isRegExp(undefined)).toBe(false);
    expect(isRegExp(false)).toBe(false);
    expect(isRegExp(0)).toBe(false);
    expect(isRegExp(NaN)).toBe(false);
    expect(isRegExp('')).toBe(false);

    expect(isRegExp(arguments)).toBe(false);
    expect(isRegExp([1, 2, 3])).toBe(false);
    expect(isRegExp(true)).toBe(false);
    expect(isRegExp(new Date())).toBe(false);
    expect(isRegExp(new Error())).toBe(false);
    expect(isRegExp(Array.prototype.slice)).toBe(false);
    expect(isRegExp({ a: 1 })).toBe(false);
    expect(isRegExp(1)).toBe(false);
    expect(isRegExp('a')).toBe(false);
    expect(isRegExp(Symbol('a'))).toBe(false);
  });
});
