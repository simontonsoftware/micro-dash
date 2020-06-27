import { flatten, identity, map } from 'lodash-es';
import { flatMap } from './flat-map';

describe('flatMap()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const array = [1, 2, 3, 4];

  function duplicate(n: number): number[] {
    return [n, n];
  }

  it('should map values in `array` to a new flattened array', () => {
    expect(flatMap(array, duplicate)).toEqual(flatten(map(array, duplicate)));
  });

  it('should accept a falsey `collection`', () => {
    expect(flatMap(null, identity)).toEqual([]);
    expect(flatMap(undefined, identity)).toEqual([]);
  });

  it('should work with objects with non-number length properties', () => {
    expect(flatMap({ length: [1, 2] }, (a) => a)).toEqual([1, 2]);
  });
});
