import {times, uniq} from 'lodash';
import {uniqueId} from './unique-id';

describe('uniqueId()', () => {
  it('uses the given prefix', () => {
    expect(uniqueId('one').startsWith('one')).toBeTruthy();
    expect(uniqueId('two').startsWith('two')).toBeTruthy();
    expect(uniqueId('repeat').startsWith('repeat')).toBeTruthy();
    expect(uniqueId('repeat').startsWith('repeat')).toBeTruthy();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should generate unique ids', () => {
    const actual = times(1000, () => uniqueId());

    expect(uniq(actual).length).toBe(actual.length);
  });

  it('should return a string value when not providing a `prefix`', () => {
    expect(typeof uniqueId()).toBe('string');
  });
});
