import { noop } from './noop';

describe('noop()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return undefined', () => {
    const values = [[], {}, null, undefined, false, 0, NaN, '', true, 1, 'a'];

    expect(noop.call({})).toBeUndefined();
    expect(noop()).toBeUndefined();
    for (const value of values) {
      expect((noop as any)(value)).toBeUndefined();
    }
  });
});
