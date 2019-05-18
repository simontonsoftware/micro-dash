import { pullAt } from "./pull-at";

function expectToEq(x: any, y: any) {
  return expect(x).toEqual(y);
}

describe("pullAt()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should modify the array and return removed elements", () => {
    const array = [1, 2, 3];
    expect(pullAt(array, [0, 1])).toEqual([1, 2]);
    expect(array).toEqual([3]);
  });

  it("should work with unsorted indexes", () => {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    expect(pullAt(array, [1, 3, 11, 7, 5, 9])).toEqual([2, 4, 12, 8, 6, 10]);
    expect(array).toEqual([1, 3, 5, 7, 9, 11]);
  });

  it("should work with repeated indexes", () => {
    const array = [1, 2, 3, 4];
    expect(pullAt(array, [0, 2, 0, 1, 0, 2])).toEqual([1, 3, 1, 2, 1, 3]);
    expect(array).toEqual([4]);
  });

  it("should use `undefined` for nonexistent indexes", () => {
    const array = ["a", "b", "c"];
    expect(pullAt(array, [2, 4, 0])).toEqual(["c", undefined, "a"]);
    expect(array).toEqual(["b"]);
  });

  it("should flatten `indexes`", () => {
    let array = ["a", "b", "c"];
    expect(pullAt(array, 2, 0)).toEqual(["c", "a"]);
    expect(array).toEqual(["b"]);

    array = ["a", "b", "c", "d"];
    expect(pullAt(array, [3, 0], 2)).toEqual(["d", "a", "c"]);
    expect(array).toEqual(["b"]);
  });

  it("should return an empty array when no indexes are given", () => {
    const array = ["a", "b", "c"];

    expectToEq(pullAt(array), []);
    expectToEq(array, ["a", "b", "c"]);

    expectToEq(pullAt(array, [], []), []);
    expectToEq(array, ["a", "b", "c"]);
  });

  it("should return an array", () => {
    const array = [1, 2, 3];
    const actual = pullAt(array);
    expect(Array.isArray(actual)).toBe(true);
    expect(actual).not.toBe(array);
  });
});
