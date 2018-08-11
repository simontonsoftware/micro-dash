import { once } from './once';

describe('once()', () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should invoke `func` once', () => {
    let count = 0;

    const oncedFn = once(function() {
      return ++count;
    });
    oncedFn();
    expect(oncedFn()).toBe(1);
    expect(count).toBe(1);
  });

  it('should ignore recursive calls', () => {
    let count = 0;

    const oncedFn = once(function() {
      oncedFn();
      return ++count;
    });
    expect(oncedFn()).toBe(1);
    expect(count).toBe(1);
  });

  it('should not throw more than once', () => {
    const oncedFn = once(function() {
      throw new Error();
    });

    expect(oncedFn).toThrowError();
    expect(oncedFn).not.toThrowError();
  });
});
