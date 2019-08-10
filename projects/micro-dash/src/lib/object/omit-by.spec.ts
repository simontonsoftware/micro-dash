import { expectType } from "s-ng-dev-utils";
import { stub } from "sinon";
import { isString } from "../lang";
import { omitBy } from "./omit-by";

describe("omitBy()", () => {
  // lodash's test (and behavior) is the opposite
  it("does not treat sparse arrays as dense", () => {
    const array = [1];
    array[2] = 3;
    const logger = stub();

    omitBy(array, logger);

    expect(logger.args).toEqual([[1, "0"], [3, "2"]]);
  });

  // lodash's test for `omit`, but not `omitBy`, even though the behavior is the same
  it("should return an empty object when `object` is nullish", () => {
    expect(omitBy<any>(null, () => true)).toEqual({});
    expect(omitBy<any>(undefined, () => false)).toEqual({});
  });

  it("has fancy typing", () => {
    interface O {
      a: number;
      2: string;
    }
    const o: O = { a: 1, 2: "b" };
    const oOrU = undefined as O | undefined;
    const oOrN = null as O | null;
    expectType<Partial<O>>(omitBy(o, () => true));
    expectType<Partial<O>>(omitBy(oOrU, () => true));
    expectType<Partial<O>>(omitBy(oOrN, () => true));
    expectType<{ a: number }>(omitBy(o, isString));
    expectType<{ a: number } | {}>(omitBy(oOrU, isString));
    expectType<{ a: number } | {}>(omitBy(oOrN, isString));
    // TODO: this seems wrong?
    // expectType<{ 2: string }>(omitBy(o, (_, k): k is string => isString(k)));
    expectType<{ 2: string } | {}>(
      omitBy(oOrU, (_, k): k is string => isString(k)),
    );
    expectType<{ 2: string } | {}>(
      omitBy(oOrN, (_, k): k is string => isString(k)),
    );

    type A = [number, string];
    const a = [1, "b"];
    const aOrU = undefined as A | undefined;
    const aOrN = null as A | null;
    expectType<{ [index: number]: number | string }>(omitBy(a, () => true));
    expectType<{ [index: number]: number | string }>(omitBy(aOrU, () => true));
    expectType<{ [index: number]: number | string }>(omitBy(aOrN, () => true));
    expectType<{ [index: number]: number }>(omitBy(a, isString));
    expectType<{ [index: number]: number }>(omitBy(aOrU, isString));
    expectType<{ [index: number]: number }>(omitBy(aOrN, isString));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should provide correct iteratee arguments", () => {
    const spy = jasmine.createSpy();
    omitBy([1, 2, 3], spy);
    expect(spy.calls.first().args).toEqual([1, "0"]);
  });

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    omitBy(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    omitBy(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should create an object with omitted string keyed properties", () => {
    const object = { a: 1, b: 2, c: 3, d: 4 };
    expect(omitBy(object, (_item, key) => key === "a")).toEqual({
      b: 2,
      c: 3,
      d: 4,
    });
  });
});
