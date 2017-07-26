import {pull} from './pull';

describe('pull()', () => {

  //
  // stolen from https://github.com/lodash/lodash
  //

  it('should modify and return the array', () => {
    let argument = [1, 2, 3];

    let returned = pull(argument, 1, 3);

    expect(returned).toBe(argument);
    expect(returned).toEqual([2]);
  });

  it('should preserve holes in arrays', () => {
    let array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    pull(array, 1);

    expect('0' in array).toBeFalsy();
    expect('1' in array).toBeTruthy();
    expect('2' in array).toBeFalsy();
  });

  it('should treat holes as `undefined`', () => {
    let array = [1, 2, 3];
    delete array[1];

    pull(array, undefined);

    expect(array).toEqual([1, 3]);
  });

  it('should match `NaN`', () => {
    let array = [1, NaN, 3, NaN];

    pull(array, NaN);

    expect(array).toEqual([1, 3]);
  });
});
