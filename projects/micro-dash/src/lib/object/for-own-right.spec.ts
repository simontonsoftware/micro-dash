import { noop } from "lodash";
import { stub } from "sinon";
import { forOwnRight } from "./for-own-right";

describe("forOwnRight()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("can exit early when iterating arrays", () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forOwnRight([1, 2, 3, 4], logger);

    expect(logger.args).toEqual([[4, "length"], [4, "3"], [3, "2"]]);
  });

  it("can exit early when iterating objects", () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forOwnRight({ a: 1, b: 2, c: 3, d: 4 }, logger);

    expect(logger.args).toEqual([[4, "d"], [3, "c"], [2, "b"]]);
  });

  it("should iterate over `length` properties", () => {
    const logger = stub();

    forOwnRight({ 0: "zero", 1: "one", length: 2 }, logger);

    expect(logger.args).toContain([2, "length"]);
  });

  it("should provide correct iteratee arguments", () => {
    const logger = stub();

    forOwnRight([1, 2, 3], logger);

    expect(logger.args).toEqual([[3, "length"], [3, "2"], [2, "1"], [1, "0"]]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    forOwnRight(array, logger);

    expect(logger.args).toEqual([[3, "length"], [3, "2"], [1, "0"]]);
  });

  it("should return the collection", () => {
    const array = [1, 2, 3];

    expect(forOwnRight(array, noop)).toBe(array);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    forOwnRight(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
