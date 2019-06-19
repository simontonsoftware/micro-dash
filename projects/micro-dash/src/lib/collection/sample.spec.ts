import { times } from "lodash-es";
import { sample } from "./sample";

describe("sample()", () => {
  it("gets the full universe of elements", () => {
    const array = [1, 2, 3];
    expect(new Set(times(30, () => sample(array)))).toEqual(new Set(array));

    const object = { a: 1, b: 2, c: 3 };
    expect(new Set(times(30, () => sample(object)))).toEqual(new Set(array));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return a random element", () => {
    const array = [1, 2, 3];
    expect(array.includes(sample(array))).toBe(true);
  });

  it("should return `undefined` when sampling empty collections", () => {
    expect(sample([])).toBeUndefined();
    expect(sample({})).toBeUndefined();
  });

  it("should sample an object", () => {
    expect([1, 2, 3].includes(sample({ a: 1, b: 2, c: 3 }))).toBe(true);
  });
});
