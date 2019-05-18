import { stub } from "sinon";
import { mapValues } from "./map-values";

describe("mapValues()", () => {
  it("works for null & undefined", () => {
    const spy = jasmine.createSpy();
    expect(mapValues(null, spy)).toEqual({});
    expect(mapValues(undefined, spy)).toEqual({});
    expect(spy).not.toHaveBeenCalled();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should iterate over `length` properties", () => {
    const logger = stub();

    mapValues({ 0: "zero", 1: "one", length: 2 }, logger);

    expect(logger.args).toEqual([["zero", "0"], ["one", "1"], [2, "length"]]);
  });

  it("should provide correct iteratee arguments", () => {
    const logger = stub();

    mapValues([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, "0"], [2, "1"], [3, "2"], [3, "length"]]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    mapValues(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"], [3, "length"]]);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    let count = 0;

    mapValues(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });

  it("should map values in `object` to a new object", () => {
    expect(mapValues({ a: 1, b: 2 }, String)).toEqual({ a: "1", b: "2" });
  });

  it("should treat arrays like objects", () => {
    expect(mapValues([1, 2], String)).toEqual({ 0: "1", 1: "2", length: "2" });
  });
});
