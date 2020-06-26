import { sortBy } from 'lodash-es';
import { expectType } from 's-ng-dev-utils';
import { toPairs } from './to-pairs';

describe('toPairs()', () => {
  it('has fancy typing', () => {
    expectType<Array<['a' | 'b', number]>>(toPairs({ a: 1, b: 2 }));
    expectType<Array<[string, number[][keyof number[]]]>>(toPairs([1, 2]));
    // todo: fancier typing for arrays
  });

  it('does not consider `length` for an array', () => {
    expect(toPairs([1, 2, 3])).toEqual([
      ['0', 1],
      ['1', 2],
      ['2', 3],
    ]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should create an array of string keyed-value pairs', () => {
    expect(sortBy(toPairs({ a: 1, b: 2 }), 0)).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
  });

  it('should not include inherited string keyed property values', () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    expect(sortBy(toPairs(new (Foo as any)()), 0)).toEqual([['a', 1]]);
  });

  it('should convert objects with a `length` property', () => {
    const actual = sortBy(toPairs({ '0': 'a', '1': 'b', length: 2 }), 0);
    expect(actual).toEqual([
      ['0', 'a'],
      ['1', 'b'],
      ['length', 2],
    ]);
  });

  it('should return an array', () => {
    const array = [1, 2, 3];
    const actual = toPairs(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array as any);
  });
});
