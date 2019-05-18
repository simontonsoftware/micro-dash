import { stub } from "sinon";
import { identity } from "../util/identity";
import { map } from "./map";

describe("forEach()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should provide correct iteratee arguments", () => {
    const logger = stub();

    map([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    map(array, logger);

    expect(logger.args).toEqual([[1, 0], [undefined, 1], [3, 2]]);
  });

  it("should not iterate custom properties of arrays", () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub();

    map(array, logger);

    expect(logger.args).toEqual([[1, 0]]);
  });

  it("iterates over own string keyed properties of objects", () => {
    const object = { a: 1 };
    const logger = stub();

    const result = map(object, logger);

    expect(logger.args).toEqual([[1, "a"]]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    let count = 0;

    map(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
    });

    expect(count).toEqual(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    let count = 0;

    map(object, () => {
      object.b = 2;
      ++count;
    });

    expect(count).toEqual(1);
  });

  it("should map values in `collection` to a new array", () => {
    expect(map({ a: 1, b: 2 }, identity)).toEqual([1, 2]);
    expect(map([1, 2], identity)).toEqual([1, 2]);
  });

  it("should accept `undefined` for `collection`", () => {
    const logger = stub();
    expect(map(undefined, logger)).toEqual([]);
    expect(logger.callCount).toBe(0);
  });

  it("should work with objects with non-number length properties", () => {
    expect(map({ length: { value: "x" } }, identity)).toEqual([{ value: "x" }]);
  });
});
