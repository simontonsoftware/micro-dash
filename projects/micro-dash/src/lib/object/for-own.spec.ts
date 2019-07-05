import { noop } from "lodash";
import { stub } from "sinon";
import { forOwn } from "./for-own";

describe("forOwn()", () => {
  // lodash's test (and behavior) is the opposite
  it("does not treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    forOwn(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"]]);
  });

  it("works for null & undefined", () => {
    const spy = jasmine.createSpy();
    forOwn(null, spy);
    forOwn(undefined, spy);
    expect(spy).not.toHaveBeenCalled();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("can exit early when iterating arrays", () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forOwn([1, 2, 3, 4], logger);

    expect(logger.args).toEqual([[1, "0"], [2, "1"], [3, "2"]]);
  });

  it("can exit early when iterating objects", () => {
    const logger = stub();
    logger.onCall(1).returns(true);
    logger.onCall(2).returns(false);

    forOwn({ a: 1, b: 2, c: 3, d: 4 }, logger);

    expect(logger.args).toEqual([[1, "a"], [2, "b"], [3, "c"]]);
  });

  it("should iterate over `length` properties", () => {
    const logger = stub();

    forOwn({ 0: "zero", 1: "one", length: 2 }, logger);

    expect(logger.args).toEqual([["zero", "0"], ["one", "1"], [2, "length"]]);
  });

  it("should provide correct iteratee arguments", () => {
    const spy = jasmine.createSpy();
    forOwn([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, "0"]);
  });

  it("should return the collection", () => {
    const array = [1, 2, 3];

    expect(forOwn(array, noop)).toBe(array);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    forOwn(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    forOwn(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
