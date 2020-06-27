import { isEqual } from './is-equal';

describe('isEqual()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should compare primitives', () => {
    const symbol1 = Symbol('a');
    const symbol2 = Symbol('b');

    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual(-0, -0)).toBe(true);
    expect(isEqual(0, 0)).toBe(true);
    expect(isEqual(0, '0')).toBe(false);
    expect(isEqual(0, null)).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(NaN, 'a')).toBe(false);
    expect(isEqual(NaN, Infinity)).toBe(false);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual('a', 'b')).toBe(false);
    expect(isEqual('a', ['a'])).toBe(false);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, 1)).toBe(false);
    expect(isEqual(true, 'a')).toBe(false);
    expect(isEqual(false, false)).toBe(true);
    expect(isEqual(false, 0)).toBe(false);
    expect(isEqual(false, '')).toBe(false);
    expect(isEqual(symbol1, symbol1)).toBe(true);
    expect(isEqual(symbol1, symbol2)).toBe(false);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual(null, {})).toBe(false);
    expect(isEqual(null, '')).toBe(false);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(undefined, null)).toBe(false);
    expect(isEqual(undefined, '')).toBe(false);
  });

  it('should compare arrays', () => {
    let array1: any[] = [true, null, 1, 'a', undefined];
    let array2: any[] = [true, null, 1, 'a', undefined];
    expect(isEqual(array1, array2)).toBe(true);

    array1 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
    array2 = [[1, 2, 3], new Date(2012, 4, 23), /x/, { e: 1 }];
    expect(isEqual(array1, array2)).toBe(true);

    array1 = [1, 2, 3];
    array2 = [3, 2, 1];
    expect(isEqual(array1, array2)).toBe(false);

    array1 = [1, 2];
    array2 = [1, 2, 3];
    expect(isEqual(array1, array2)).toBe(false);
  });

  it('should compare plain objects', () => {
    let object1: object = { a: true, b: null, c: 1, d: 'a', e: undefined };
    let object2: object = { a: true, b: null, c: 1, d: 'a', e: undefined };
    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: [1, 2, 3], d: { e: 1 } };
    object2 = { a: [1, 2, 3], d: { e: 1 } };
    expect(isEqual(object1, object2)).toBe(true);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { a: 3, b: 2, c: 1 };
    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2, c: 3 };
    object2 = { d: 1, e: 2, f: 3 };
    expect(isEqual(object1, object2)).toBe(false);

    object1 = { a: 1, b: 2 };
    object2 = { a: 1, b: 2, c: 3 };
    expect(isEqual(object1, object2)).toBe(false);
  });

  it('should compare objects regardless of key order', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    const object2 = { c: 3, a: 1, b: 2 };

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare nested objects', () => {
    const object1 = {
      a: [1, 2, 3],
      b: true,
      d: 'a',
      e: { f: ['a', 'c'], j: 'a' },
    };
    const object2 = {
      a: [1, 2, 3],
      b: true,
      d: 'a',
      e: { f: ['a', 'c'], j: 'a' },
    };

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should compare objects with constructor properties', () => {
    expect(isEqual({ constructor: 1 }, { constructor: 1 })).toBe(true);
    expect(isEqual({ constructor: 1 }, { constructor: '1' })).toBe(false);
    expect(isEqual({ constructor: [1] }, { constructor: [1] })).toBe(true);
    expect(isEqual({ constructor: [1] }, { constructor: ['1'] })).toBe(false);
    expect(isEqual({ constructor: Object }, {})).toBe(false);
  });

  it('should compare objects with shared property values', () => {
    const object1: any = { a: [1, 2] };
    const object2 = { a: [1, 2], b: [1, 2] };
    object1.b = object1.a;

    expect(isEqual(object1, object2)).toBe(true);
  });

  it('should avoid common type coercions', () => {
    expect(isEqual(0, '')).toBe(false);
    expect(isEqual(1, true)).toBe(false);
    expect(isEqual(1337756400000, new Date(2012, 4, 23))).toBe(false);
    expect(isEqual('36', 36)).toBe(false);
    expect(isEqual(36, '36')).toBe(false);
  });

  it('is `false` for objects with custom `toString` methods', () => {
    let primitive: any;
    const object = {
      toString(): any {
        return primitive;
      },
    };

    for (const value of [true, null, 1, 'a', undefined]) {
      primitive = value;
      expect(isEqual(object, value)).toBe(false);
    }
  });
});
