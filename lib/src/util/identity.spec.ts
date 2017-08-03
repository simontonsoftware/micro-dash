import {identity} from './identity';

describe('identity()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should return the first argument given', () => {
    const object = { 'name': 'fred' };
    expect(identity(object)).toBe(object);
  });
});
