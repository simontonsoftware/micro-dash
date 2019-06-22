import { pullAll } from "./pull-all";

describe("pullAll()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should modify and return the array", () => {
    const argument = [1, 2, 3];

    const returned = pullAll(argument, [1, 3]);

    expect(returned).toBe(argument);
    expect(returned).toEqual([2]);
  });

  it("should preserve holes in arrays", () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    pullAll(array, [1]);

    expect("0" in array).toBeFalsy();
    expect("1" in array).toBeTruthy();
    expect("2" in array).toBeFalsy();
  });

  it("should treat holes as `undefined`", () => {
    const array = [1, 2, 3];
    delete array[1];

    pullAll(array, [undefined]);

    expect(array).toEqual([1, 3]);
  });

  it("should match `NaN`", () => {
    const array = [1, NaN, 3, NaN];

    pullAll(array, [NaN]);

    expect(array).toEqual([1, 3]);
  });

  it("should work with the same value for `array` and `values`", () => {
    const array = [{ a: 1 }, { b: 2 }];
    expect(pullAll(array, array)).toEqual([]);
  });

  it("should return an array", () => {
    const array = [1, 2, 3];
    const actual = pullAll(array, []);

    expect(actual).toEqual(array);
    expect(actual).toBe(array);
  });
});
