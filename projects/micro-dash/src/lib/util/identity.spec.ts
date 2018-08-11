import { identity } from './identity';

describe('identity()', () => {
  it('works when given too many arguments', () => {
    expect((identity as any)(1, 2)).toBe(1);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the first argument given', () => {
    const object = { name: 'fred' };
    expect(identity(object)).toBe(object);
  });
});
