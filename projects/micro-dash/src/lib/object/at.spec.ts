import { toArray } from "../lang";
import { at } from "./at";

describe("at()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const array = ["a", "b", "c"];
  const object = { a: [{ b: { c: 3 } }, 4] };

  it("should return the elements corresponding to the specified keys", () => {
    expect(at(array, [0, 2])).toEqual(["a", "c"]);
  });

  it("should return `undefined` for nonexistent keys", () => {
    expect(at(array, [2, 4, 0])).toEqual(["c", undefined, "a"]);
  });

  it("should return an empty array when no keys are given", () => {
    expect(at(array)).toEqual([]);
    expect(at(array, [], [])).toEqual([]);
  });

  it("should accept multiple key arguments", () => {
    expect(at(["a", "b", "c", "d"], 3, 0, 2)).toEqual(["d", "a", "c"]);
  });

  it("should work with a falsey `object` when keys are given", () => {
    expect(at(null, 0, 1, "pop", "push")).toEqual(Array(4));
    expect(at(undefined, 0, 1, "pop", "push")).toEqual(Array(4));
  });

  it("should work with an object for `object`", () => {
    expect(at(object, [["a", 0, "b", "c"], ["a", 1]])).toEqual([3, 4]);
  });

  it("should return an array", () => {
    const actual = at(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
