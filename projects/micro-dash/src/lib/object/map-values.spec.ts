import { expectCallsAndReset } from "s-ng-dev-utils";
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

  it("should provide correct iteratee arguments", () => {
    const spy = jasmine.createSpy();
    mapValues([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, "0"]);
  });

  it("should treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const spy = jasmine.createSpy();

    mapValues(array, spy);

    expectCallsAndReset(spy, [1, "0"], [3, "2"]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return true;
    });

    mapValues(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    mapValues(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should map values in `object` to a new object", () => {
    expect(mapValues({ a: 1, b: 2 }, String)).toEqual({ a: "1", b: "2" });
  });

  it("should treat arrays like objects", () => {
    expect(mapValues([1, 2], String)).toEqual({ 0: "1", 1: "2" });
  });
});
