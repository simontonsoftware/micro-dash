import { last } from './last';

describe('last()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the last element', () => {
    expect(last([1, 2, 3, 4])).toBe(4);
  });

  it('should return `undefined` when querying empty arrays', () => {
    expect(last([])).toBeUndefined();
  });
});
