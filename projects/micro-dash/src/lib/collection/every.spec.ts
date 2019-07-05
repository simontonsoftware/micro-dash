import { identity } from "lodash";
import { stub } from "sinon";
import { every } from "./every";

describe("every()", () => {
  it("returns `true` if `predicate` returns truthy for all elements", () => {
    expect(every([true, 1, "a"], identity)).toBe(true);
  });

  it("should return `true` for empty collections", () => {
    for (const empty of [[], {}, null, undefined, false, 0, NaN, ""]) {
      expect(every(empty, identity)).toBe(true);
    }
  });

  it("should return `false` as soon as `predicate` returns falsey", () => {
    let count = 0;

    const result = every([true, null, true], (value) => {
      ++count;
      return value;
    });

    expect(result).toBe(false);
    expect(count).toBe(2);
  });

  it("should work with collections of `undefined` values", () => {
    expect(every([undefined, undefined, undefined], identity)).toBe(false);
  });

  it("should provide correct iteratee arguments", () => {
    const logger = stub().returns(true);

    every([1, 2, 3], logger);

    expect(logger.args).toEqual([[1, 0], [2, 1], [3, 2]]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub().returns(true);

    every(array, logger);

    expect(logger.args).toEqual([[1, 0], [undefined, 1], [3, 2]]);
  });

  it("should not iterate custom properties of arrays", () => {
    const array = [1];
    (array as any).a = 1;
    const logger = stub().returns(true);

    every(array, logger);

    expect(logger.args).toEqual([[1, 0]]);
  });

  it("iterates over own string keyed properties of objects", () => {
    const object = { a: 1 };
    const logger = stub().returns(true);

    every(object, logger);

    expect(logger.args).toEqual([[1, "a"]]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    let count = 0;

    every(array, () => {
      if (!count) {
        array.push(2);
      }
      ++count;
    });

    expect(count).toEqual(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    every(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
