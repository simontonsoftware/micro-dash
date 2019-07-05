import { identity } from "lodash";
import { stub } from "sinon";
import { reduce } from "./reduce";

describe("reduce()", () => {
  it("works with `undefined`", () => {
    expect(reduce(undefined, () => 1, 2)).toEqual(2);
    expect(reduce(undefined, () => 1)).toBeUndefined();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should use the first element as the `accumulator`", () => {
    expect(reduce([1, 2, 3], identity)).toEqual(1);
  });

  it("should provide correct `iteratee` arguments for an array", () => {
    const logger = stub().returns(7);
    reduce([1, 2, 3], logger, 0);
    expect(logger.args).toEqual([[0, 1, 0], [7, 2, 1], [7, 3, 2]]);

    logger.resetHistory();
    reduce([1, 2, 3], logger);
    expect(logger.args).toEqual([[1, 2, 1], [7, 3, 2]]);
  });

  it("should provide correct `iteratee` arguments for an object", () => {
    const logger = stub().returns(7);
    reduce({ a: 1, b: 2 }, logger, 0);
    expect(logger.args).toEqual([[0, 1, "a"], [7, 2, "b"]]);

    logger.resetHistory();
    reduce({ a: 1, b: 2 }, logger);
    expect(logger.args).toEqual([[1, 2, "b"]]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    reduce(array, spy, array);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    reduce(object, spy, object);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
