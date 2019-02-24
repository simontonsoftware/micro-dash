import { includes } from "./includes";

describe("includes()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const array = [1, 2, 3];

  it("should work with an array and a positive `fromIndex`", () => {
    expect(includes(array, 3, 2)).toBe(true);
    expect(includes(array, 2, 2)).toBe(false);
  });

  it("should work with an array and a `fromIndex` >= `length`", () => {
    for (const fromIndex of [4, 6, 2 ** 32, Infinity]) {
      expect(includes(array, 1, fromIndex)).toBe(false);
    }
  });

  it("should work with an array and coerce `fromIndex` to an integer", () => {
    expect(includes(array, 1, 0.1)).toBe(true);
    expect(includes(array, 1, NaN)).toBe(true);
  });

  it("should work with an array and a negative `fromIndex`", () => {
    expect(includes(array, 3, -1)).toBe(true);
    expect(includes(array, 2, -1)).toBe(false);
  });

  it("should work with an array and a negative `fromIndex` <= `-length`", () => {
    for (const fromIndex of [-4, -6, -Infinity]) {
      expect(includes(array, 1, fromIndex)).toBe(true);
    }
  });

  it("should return `true` for  matched values", () => {
    expect(includes([1, 2, 3, 4], 3)).toBe(true);
    expect(includes({ a: 1, b: 2, c: 3, d: 4 }, 3)).toBe(true);
    expect(includes("1234", "3")).toBe(true);
  });

  it("should return `false` for unmatched values", () => {
    expect(includes([1, 2, 3, 4], 5)).toBe(false);
    expect(includes({ a: 1, b: 2, c: 3, d: 4 }, 5)).toBe(false);
    expect(includes("1234", "5")).toBe(false);
  });

  it("should floor `position` values", () => {
    expect(includes([1, 2, 3, 4], 2, 1.2)).toBe(true);
  });
});
