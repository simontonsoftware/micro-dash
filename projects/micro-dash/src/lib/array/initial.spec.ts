import { expectType } from "s-ng-dev-utils";
import { map } from "../collection/map";
import { initial } from "./initial";

describe("initial", () => {
  it("has fancy typing", () => {
    expectType<number[]>(initial([1]));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should exclude last element", () => {
    expect(initial([1, 2, 3])).toEqual([1, 2]);
  });

  it("should return an empty when querying empty arrays", () => {
    expect(initial([])).toEqual([]);
  });

  it("should work as an iteratee for methods like `_.map`", () => {
    const actual = map(
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      initial,
    );
    expect(actual).toEqual([
      [1, 2],
      [4, 5],
      [7, 8],
    ]);
  });

  it("should return an array", () => {
    const array = [1, 2, 3];
    const actual = initial(array);

    expect(actual).toEqual(jasmine.any(Array));
    expect(actual).not.toBe(array);
  });
});
