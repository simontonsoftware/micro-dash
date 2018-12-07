import { identity } from "lodash-es";
import { stub } from "sinon";
import { sumBy } from "./sum-by";

describe("sumBy()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const array = [6, 4, 2];
  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }];

  it("should work with an `iteratee`", () => {
    expect(sumBy(objects, (object) => object.a)).toBe(6);
  });

  it("should provide correct `iteratee` arguments", () => {
    const logger = stub();
    sumBy([6], logger);
    expect(logger.args).toEqual([[6]]);
  });

  it("should return the sum of an array of numbers", () => {
    expect(sumBy(array, identity)).toBe(12);
  });

  it("should return `0` when passing empty `array` values", () => {
    expect(sumBy([], identity)).toBe(0);
  });

  it("should not skip `NaN` values", () => {
    expect(sumBy([1, NaN], identity)).toBeNaN();
  });
});
