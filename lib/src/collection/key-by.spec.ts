import {keyBy} from './key-by';
import {noop} from 'lodash';

describe('keyBy()', () => {
  it('works with `undefined`', () => {
    expect(keyBy(undefined, () => 'a')).toEqual({});
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should transform keys by `iteratee`', () => {
    const array = [{dir: 'left', code: 97}, {dir: 'right', code: 100}];

    expect(keyBy(array, (object) => String.fromCharCode(object.code)))
      .toEqual({a: {dir: 'left', code: 97}, d: {dir: 'right', code: 100}});
  });

  it('should only add values to own, not inherited, properties', () => {
    const actual: any = keyBy(
      [6.1, 4.2, 6.3],
      (n) => Math.floor(n) > 4 ? 'hasOwnProperty' : 'constructor',
    );

    expect(actual.constructor).toEqual(4.2);
    expect(actual.hasOwnProperty).toEqual(6.3);
  });

  it('should work with an object for `collection`', () => {
    expect(keyBy(
      { 'a': 6.1, 'b': 4.2, 'c': 6.3 },
      (value) => Math.floor(value) + '',
    )).toEqual({ '4': 4.2, '6': 6.3 });
  });
});
