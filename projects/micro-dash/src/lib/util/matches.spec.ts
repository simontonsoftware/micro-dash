import { cloneDeep } from 'lodash-es';
import { find } from '../collection/find';
import { matches } from './matches';

describe('matches()', () => {
  it('works as a predicate for `find()`', () => {
    const objects = [
      { a: 0, b: 0 },
      { a: 1, b: 1 },
      { a: 2, b: 2 },
    ];
    expect(find(objects, matches({ a: 1 }))).toBe(objects[1]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should not change behavior if `source` is modified', () => {
    let source: any = { a: { b: 2, c: 3 } };
    let clone = cloneDeep(source);
    let par = matches(source);
    expect(par(clone)).toBe(true);
    source.a.b = 1;
    source.a.c = 2;
    source.a.d = 3;
    expect(par(clone)).toBe(true);
    expect(par(source)).toBe(false);

    source = { a: 1, b: 2 };
    clone = cloneDeep(source);
    par = matches(source);
    source.a = 2;
    source.b = 1;
    source.c = 3;
    expect(par(clone)).toBe(true);
    expect(par(source)).toBe(false);

    source = { a: 1 };
    clone = cloneDeep(source);
    par = matches(source);
    source.a = 2;
    source.b = 1;
    source.c = 3;
    expect(par(clone)).toBe(true);
    expect(par(source)).toBe(false);
  });

  it('should perform a deep comparison between `source` and `object`', () => {
    const object1 = { a: 1, b: 2, c: 3 };
    expect(matches({ a: 1 })(object1)).toBe(true);
    expect(matches({ b: 1 })(object1)).toBe(false);
    expect(matches({ a: 1, c: 3 })(object1)).toBe(true);
    expect(matches({ c: 3, d: 4 })(object1)).toBe(false);

    const object2 = { a: { b: { c: 1, d: 2 }, e: 3 }, f: 4 };
    expect(matches({ a: { b: { c: 1 } } })(object2)).toBe(true);
  });

  it('should compare a variety of `source` property values', () => {
    const object = { a: false, b: true, c: '3', d: 4, e: [5], f: { g: 6 } };

    expect(matches(object)(object)).toBe(true);
    expect(
      matches({
        a: 0,
        b: 1,
        c: 3,
        d: '4',
        e: ['5'],
        f: { g: '6' },
      })(object),
    ).toBe(false);
  });

  it('should partial match arrays', () => {
    const object1 = { a: ['b'] };
    const object2 = { a: ['c', 'd'] };

    let par = matches({ a: ['d'] });
    expect(par(object1)).toBe(false);
    expect(par(object2)).toBe(true);

    par = matches({ a: ['b', 'd'] });
    expect(par(object1)).toBe(false);
    expect(par(object2)).toBe(false);

    par = matches({ a: ['d', 'b'] });
    expect(par(object1)).toBe(false);
    expect(par(object2)).toBe(false);
  });

  it('should partial match arrays with duplicate values', () => {
    const par = matches({ a: [2, 2] });
    expect(par({ a: [1, 2] })).toEqual(false);
    expect(par({ a: [2, 2] })).toEqual(true);
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
    const par = matches({ a: [{ b: 1 }, { b: 4, c: 5 }] });
    expect(par(object1)).toEqual(true);
    expect(par(object2)).toEqual(false);
  });

  it('should match `undefined` values', () => {
    const object1 = { a: 1 };
    const object2 = { a: 1, b: 1 };
    const object3 = { a: 1, b: undefined };

    let par = matches({ b: undefined });
    expect(par(object1)).toBe(false);
    expect(par(object2)).toBe(false);
    expect(par(object3)).toBe(true);

    par = matches({ a: 1, b: undefined });
    expect(par(object1)).toBe(false);
    expect(par(object2)).toBe(false);
    expect(par(object3)).toBe(true);

    par = matches({ a: { c: undefined } });
    expect(par({ a: { b: 2 } })).toBe(false);
    expect(par({ a: { b: 2, c: 3 } })).toBe(false);
    expect(par({ a: { b: 2, c: undefined } })).toBe(true);
  });

  it('should return `false` when `object` is nullish', () => {
    const par = matches({ a: 1 });
    expect(par(null)).toBe(false);
    expect(par(undefined)).toBe(false);
  });

  it('should return `true` when comparing an empty `source`', () => {
    const object = { a: 1 };
    expect(matches([])(object)).toBe(true);
    expect(matches({})(object)).toBe(true);
    expect(matches(null)(object)).toBe(true);
    expect(matches(undefined)(object)).toBe(true);
    expect(matches(false)(object)).toBe(true);
    expect(matches(0)(object)).toBe(true);
    expect(matches(NaN)(object)).toBe(true);
    expect(matches('')(object)).toBe(true);
  });

  it('should return `true` when comparing an empty `source` to a nullish `object`', () => {
    const par = matches({});
    expect(par(null)).toEqual(true);
    expect(par(undefined)).toEqual(true);
  });

  it('should return `true` when comparing a `source` of empty arrays and objects', () => {
    const par = matches({ a: [], b: {} });
    expect(par({ a: [1], b: { c: 1 } })).toBe(true);
    expect(par({ a: [2, 3], b: { d: 2 } })).toBe(true);
  });
});
