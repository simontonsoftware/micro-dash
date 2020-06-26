import { padStart } from './pad-start';

describe('padStart()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const abc = 'abc';

  it('should pad a string to a given length', () => {
    expect(padStart(abc, 6)).toEqual('   abc');
    expect(padStart(abc, 6, undefined)).toEqual('   abc');
  });

  it('should truncate pad characters to fit the pad length', () => {
    expect(padStart(abc, 6, '_-')).toEqual('_-_abc');
  });

  it('should not pad if string is >= `length`', () => {
    expect(padStart(abc, 2)).toEqual(abc);
    expect(padStart(abc, 3)).toEqual(abc);
  });

  it('should treat negative `length` as `0`', () => {
    expect(padStart(abc, 0)).toEqual(abc);
    expect(padStart(abc, -2)).toEqual(abc);
  });

  it('should return `string` when `chars` is the empty string', () => {
    expect(padStart(abc, 6, '')).toEqual(abc);
  });
});
