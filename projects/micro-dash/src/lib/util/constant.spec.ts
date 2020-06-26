import { constant } from './constant';

describe('constant()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should create a function that returns `value`', () => {
    const object = { a: 1 };
    const resultFn: any = constant(object);
    const values = [[], {}, null, undefined, false, 0, NaN, '', true, 1, 'a'];

    expect(resultFn.call({})).toBe(object);
    expect(resultFn()).toBe(object);
    for (const value of values) {
      expect(resultFn(value)).toBe(object);
    }
  });

  it('should work with falsey values', () => {
    const falsey = [null, undefined, false, 0, NaN, ''];

    expect((constant as any)()()).toBeUndefined();
    for (const value of falsey) {
      expect(constant(value)()).toEqual(value);
    }
  });
});
