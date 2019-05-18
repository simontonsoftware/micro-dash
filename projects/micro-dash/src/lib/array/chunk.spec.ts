import { isArray } from "lodash-es";
import { chunk } from "./chunk";

describe("chunk()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return chunked arrays", () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(chunk(array, 3)).toEqual([[0, 1, 2], [3, 4, 5]]);
  });

  it("should return the last chunk as remaining elements", () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(chunk(array, 4)).toEqual([[0, 1, 2, 3], [4, 5]]);
  });

  it("should ensure the minimum `size` is `0`", () => {
    const array = [0, 1, 2, 3, 4, 5];
    const expected = [[], [], [], [], [], []];
    expect(chunk(array, 0)).toEqual(expected);
    expect(chunk(array, -1)).toEqual(expected);
    expect(chunk(array, -Infinity)).toEqual(expected);
  });

  it("should coerce `size` to an integer", () => {
    const array = [0, 1, 2, 3, 4, 5];
    expect(chunk(array, 1.5)).toEqual([[0], [1], [2], [3], [4], [5]]);
  });

  it("should return an array", () => {
    const array = [1, 2, 3];
    const actual = chunk(array);
    expect(isArray(actual)).toBe(true);
    expect((actual as any) === array).toBe(false);
  });
});
