import { expectType } from "s-ng-dev-utils";
import { stub } from "sinon";
import { mapValues } from "./map-values";

describe("mapValues()", () => {
  it("works for null & undefined", () => {
    const spy = jasmine.createSpy();
    expect(mapValues(null, spy)).toEqual({});
    expect(mapValues(undefined, spy)).toEqual({});
    expect(spy).not.toHaveBeenCalled();
  });

  it("has fancy typing", () => {
    interface O {
      a: number;
      b: number;
    }
    type A = number[];
    interface MappedO {
      a: string;
      b: string;
    }
    interface MappedA {
      [index: number]: string;
    }

    expectType<MappedO>(mapValues({ a: 1, b: 2 }, String));
    expectType<MappedA>(mapValues([1, 2], String));

    const oOrN = null as O | null;
    const oOrU = undefined as O | undefined;
    const aOrN = null as A | null;
    const aOrU = undefined as A | undefined;
    expectType<MappedO | {}>(mapValues(oOrN, String));
    expectType<MappedO | {}>(mapValues(oOrU, String));
    expectType<MappedA | {}>(mapValues(aOrN, String));
    expectType<MappedA | {}>(mapValues(aOrU, String));
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
    const logger = stub();

    mapValues(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"]]);
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
