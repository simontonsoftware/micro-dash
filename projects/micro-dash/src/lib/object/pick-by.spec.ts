import { expectType } from "s-ng-dev-utils";
import { stub } from "sinon";
import { isString } from "../lang";
import { pickBy } from "./pick-by";

describe("pickBy()", () => {
  // lodash's test (and behavior) is the opposite
  it("does not treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    pickBy(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"]]);
  });

  // lodash's test for `pick`, but not `pickBy`, even though the behavior is the same
  it("should return an empty object when `object` is nullish", () => {
    expect(pickBy(null, () => true)).toEqual({});
    expect(pickBy(undefined, () => false)).toEqual({});
  });

  it("has fancy typing", () => {
    interface O {
      a: number;
      2: string;
    }
    const o: O = { a: 1, 2: "b" };
    const oOrU = undefined as O | undefined;
    const oOrN = null as O | null;
    expectType<Partial<O>>(pickBy(o, () => true));
    expectType<Partial<O>>(pickBy(oOrU, () => true));
    expectType<Partial<O>>(pickBy(oOrN, () => true));
    expectType<{ 2: string }>(pickBy(o, isString));
    expectType<{ 2: string } | {}>(pickBy(oOrU, isString));
    expectType<{ 2: string } | {}>(pickBy(oOrN, isString));
    // TODO: this seems wrong?
    // expectType<{ a: number }>(pickBy(o, (_, k): k is string => isString(k)));
    expectType<{ a: number } | {}>(
      pickBy(oOrU, (_, k): k is string => isString(k)),
    );
    expectType<{ a: number } | {}>(
      pickBy(oOrN, (_, k): k is string => isString(k)),
    );

    type A = [number, string];
    const a = [1, "b"];
    const aOrU = undefined as A | undefined;
    const aOrN = null as A | null;
    expectType<{ [index: number]: number | string }>(pickBy(a, () => true));
    expectType<{ [index: number]: number | string }>(pickBy(aOrU, () => true));
    expectType<{ [index: number]: number | string }>(pickBy(aOrN, () => true));
    expectType<{ [index: number]: string }>(pickBy(a, isString));
    expectType<{ [index: number]: string }>(pickBy(aOrU, isString));
    expectType<{ [index: number]: string }>(pickBy(aOrN, isString));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should provide correct iteratee arguments", () => {
    const spy = jasmine.createSpy();
    pickBy([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, "0"]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    pickBy(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    pickBy(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should work with a predicate argument", () => {
    expect(
      pickBy({ a: 1, b: 2, c: 3, d: 4 }, (n) => n === 1 || n === 3),
    ).toEqual({ a: 1, c: 3 });
  });

  it("should create an object of picked string keyed properties", () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };

    expect(pickBy(object, (_item, key) => key === "a")).toEqual({ a: 1 });
  });

  it("should work with an array `object`", () => {
    const array = [1, 2, 3];
    expect(pickBy(array, (_item, key) => key === "1")).toEqual({ 1: 2 });
  });
});
