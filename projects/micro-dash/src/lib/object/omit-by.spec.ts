import { omitBy } from "./omit-by";
import { stub } from "sinon";

describe("omitBy()", () => {
  // lodash's test (and behavior) is the opposite
  it("does not treat sparse arrays as dense", () => {
    let array = [1];
    array[2] = 3;
    const logger = stub();

    omitBy(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"], [3, "length"]]);
  });

  // lodash's test for `omit`, but not `omitBy`, even though the behavior is the same
  it("should return an empty object when `object` is nullish", () => {
    expect(omitBy<any>(null, () => true)).toEqual({});
    expect(omitBy<any>(undefined, () => false)).toEqual({});
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should provide correct iteratee arguments", () => {
    const logger = stub();

    omitBy([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, "0"], [2, "1"], [3, "2"], [3, "length"]]);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    let count = 0;

    omitBy(object, () => {
      object.b = 2;
      ++count;
      return false;
    });

    expect(count).toEqual(1);
  });

  it("should create an object with omitted string keyed properties", () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    expect(omitBy(object, (item, key) => key === "a")).toEqual({
      b: 2,
      c: 3,
      d: 4,
    });
  });
});
