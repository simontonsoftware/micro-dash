import { toArray } from "./to-array";

describe("toArray()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should convert objects to arrays", () => {
    expect(toArray({ a: 1, b: 2 })).toEqual([1, 2]);
  });

  it("should convert strings to arrays", () => {
    expect(toArray("")).toEqual([]);
    expect(toArray("ab")).toEqual(["a", "b"]);
  });

  it("should return a shallow clone of arrays", () => {
    const array = [1, 2, 3];
    const actual = toArray(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
  });

  it("should work with a node list for `collection`", () => {
    const actual = toArray(document.getElementsByTagName("body"));
    expect(actual).toEqual([document.body]);
  });

  it("should accept falsey arguments", () => {
    expect(toArray(null)).toEqual([]);
    expect(toArray(undefined)).toEqual([]);
    expect(toArray(false)).toEqual([]);
    expect(toArray(0)).toEqual([]);
    expect(toArray(NaN)).toEqual([]);
    expect(toArray("")).toEqual([]);
  });

  it("should return an array", () => {
    const array = [1, 2, 3];
    const actual = toArray(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
