import { identity } from 'lodash-es';
import { sortBy } from './sort-by';

describe('sortBy()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const objects = [
    { a: 'x', b: 3 },
    { a: 'y', b: 4 },
    { a: 'x', b: 1 },
    { a: 'y', b: 2 },
  ];

  it('should sort in ascending order by `iteratee`', () => {
    const result = sortBy(objects, (e) => e.b);
    expect(result.map((e) => e.b)).toEqual([1, 2, 3, 4]);
  });

  it('should work with an object for `collection`', () => {
    const actual = sortBy({ a: 1, b: 2, c: 3 }, Math.sin);
    expect(actual).toEqual([3, 1, 2]);
  });

  it('should move `NaN` and nullish values to the end', () => {
    expect(
      sortBy(
        [NaN, undefined, null, 4, null, 1, undefined, 3, NaN, 2],
        identity,
      ),
    ).toEqual([1, 2, 3, 4, null, null, undefined, undefined, NaN, NaN]);

    expect(
      sortBy(
        [NaN, undefined, null, 'd', null, 'a', undefined, 'c', NaN, 'b'],
        identity,
      ),
    ).toEqual(['a', 'b', 'c', 'd', null, null, undefined, undefined, NaN, NaN]);
  });

  it('should treat number values for `collection` as empty', () => {
    expect(sortBy(1, identity)).toEqual([]);
  });

  it('should coerce arrays returned from `iteratee`', () => {
    const actual = sortBy(objects, (object) => {
      const result = [object.a, object.b];
      result.toString = function() {
        return String(this[0]);
      };
      return result;
    });

    expect(actual).toEqual([objects[0], objects[2], objects[1], objects[3]]);
  });
});
