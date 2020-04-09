import { identity } from "lodash-es";
import { expectCallsAndReset } from "s-ng-dev-utils";
import { every } from "./every";
import { some } from "./some";

describe("some()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return `true` if `predicate` returns truthy for any element", () => {
    expect(some([false, 1, ""], identity)).toBe(true);
    expect(some([null, "a", 0], identity)).toBe(true);
  });

  it("should return `false` for empty collections", () => {
    for (const empty of [[], {}, null, undefined, false, 0, NaN, ""]) {
      expect(some(empty, identity)).toBe(false);
    }
  });

  it("should return `true` as soon as `predicate` returns truthy", () => {
    let count = 0;

    const result = some([null, true, null], (value) => {
      ++count;
      return value;
    });

    expect(result).toBe(true);
    expect(count).toBe(2);
  });

  it("should return `false` if `predicate` returns falsey for all elements", () => {
    expect(some([false, false, false], identity)).toBe(false);
    expect(some([null, 0, ""], identity)).toBe(false);
  });

  it("should provide correct iteratee arguments", () => {
    const spy = jasmine.createSpy();
    some([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, 0]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const spy = jasmine.createSpy();

    some(array, spy);

    expectCallsAndReset(spy, [1, 0], [undefined, 1], [3, 2]);
  });

  it("should not iterate custom properties on arrays", () => {
    const array = [1];
    (array as any).a = 1;
    const spy = jasmine.createSpy();

    some(array, spy);

    expectCallsAndReset(spy, [1, 0]);
  });

  it("iterates over own string keyed properties of objects", () => {
    const object = { a: 1 };
    const spy = jasmine.createSpy();

    some(object, spy);

    expectCallsAndReset(spy, [1, "a"]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    some(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return false;
    });

    every(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
