import { Falsey } from 'utility-types';
import { ObjectWith } from '../interfaces';
import { isMatch } from './is-match';

describe('isMatch()', () => {
  // hits some code coverage missed by the lodash tests
  it('can tell the difference between an object and an array', () => {
    expect(
      isMatch<any>(['a'], { 0: 'a' }),
    ).toBe(false);
    expect(
      isMatch<any>({ 0: 'a' }, ['a']),
    ).toBe(false);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should perform a deep comparison between `source` and `object`', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    expect(isMatch(object1, { a: 1 })).toBe(true);
    expect(isMatch(object1, { b: 1 })).toBe(false);
    expect(isMatch(object1, { a: 1, c: 3 })).toBe(true);
    expect(isMatch(object1, { c: 3, d: 4 } as any)).toBe(false);

    const object2 = { a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 };
    expect(isMatch(object2, { a: { b: { c: 1 } } })).toBe(true);
  });

  it('should compare a variety of `source` property values', () => {
    const object = { a: false, b: true, c: '3', d: 4, e: [5], f: { g: 6 } };

    expect(isMatch(object, object)).toBe(true);
    expect(
      isMatch(object, {
        a: 0,
        b: 1,
        c: 3,
        d: '4',
        e: ['5'],
        f: { g: '6' },
      } as any),
    ).toBe(false);
  });

  it('should partial match arrays', () => {
    const object1 = { a: ['b'] };
    const object2 = { a: ['c', 'd'] };
    expect(isMatch(object1, { a: ['d'] })).toBe(false);
    expect(isMatch(object2, { a: ['d'] })).toBe(true);
    expect(isMatch(object1, { a: ['b', 'd'] })).toBe(false);
    expect(isMatch(object2, { a: ['b', 'd'] })).toBe(false);
    expect(isMatch(object1, { a: ['d', 'b'] })).toBe(false);
    expect(isMatch(object2, { a: ['d', 'b'] })).toBe(false);
  });

  it('should partial match arrays with duplicate values', () => {
    expect(isMatch({ a: [1, 2] }, { a: [2, 2] })).toEqual(false);
    expect(isMatch({ a: [2, 2] }, { a: [2, 2] })).toEqual(true);
  });

  it('should partial match arrays of objects', () => {
    const object1 = {
      a: [
        { b: 1, c: 2 },
        { b: 4, c: 5, d: 6 },
      ],
    };
    const object2 = {
      a: [
        { b: 1, c: 2 },
        { b: 4, c: 6, d: 7 },
      ],
    };
    const source = { a: [{ b: 1 }, { b: 4, c: 5 }] };
    expect(isMatch(object1, source)).toEqual(true);
    expect(isMatch(object2, source)).toEqual(false);
  });

  it('should match `undefined` values', () => {
    const object1 = { a: 1 };
    const object2 = { a: 1, b: 1 };
    const object3 = { a: 1, b: undefined };

    let source: any = { b: undefined };
    expect(isMatch(object1, source)).toBe(false);
    expect(isMatch(object2, source)).toBe(false);
    expect(isMatch(object3, source)).toBe(true);

    source = { a: 1, b: undefined };
    expect(isMatch(object1, source)).toBe(false);
    expect(isMatch(object2, source)).toBe(false);
    expect(isMatch(object3, source)).toBe(true);

    source = { a: { c: undefined } };
    expect(isMatch({ a: { b: 2 } }, source)).toBe(false);
    expect(isMatch({ a: { b: 2, c: 3 } }, source)).toBe(false);
    expect(isMatch({ a: { b: 2, c: undefined } }, source)).toBe(true);
  });

  it('should return `false` when `object` is nullish', () => {
    const source: any = { a: 1 };
    expect(isMatch(null, source)).toBe(false);
    expect(isMatch(undefined, source)).toBe(false);
  });

  it('should return `true` when comparing an empty `source`', () => {
    const object = { a: 1 } as { a: 1 } | any[] | Falsey;
    expect(isMatch(object, [])).toBe(true);
    expect(isMatch(object, {})).toBe(true);
    expect(isMatch(object, null)).toBe(true);
    expect(isMatch(object, undefined)).toBe(true);
    expect(isMatch(object, false)).toBe(true);
    expect(isMatch(object, 0)).toBe(true);
    // expect(isMatch(object, NaN)).toBe(true);
    expect(isMatch(object, '')).toBe(true);
  });

  it('should return `true` when comparing an empty `source` to a nullish `object`', () => {
    expect(isMatch(null as null | {}, {})).toEqual(true);
    expect(isMatch(undefined as undefined | {}, {})).toEqual(true);
  });

  it('should return `true` when comparing a `source` of empty arrays and objects', () => {
    const source: { a: number[]; b: ObjectWith<number> } = { a: [], b: {} };
    expect(isMatch({ a: [1], b: { c: 1 } }, source)).toBe(true);
    expect(isMatch({ a: [2, 3], b: { d: 2 } }, source)).toBe(true);
  });
});
