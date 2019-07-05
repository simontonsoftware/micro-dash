import { expectType } from "s-ng-dev-utils";
import { keyBy } from "./key-by";

describe("keyBy()", () => {
  it("works with nil", () => {
    expect(keyBy(null, () => "a")).toEqual({});
    expect(keyBy(undefined, () => "a")).toEqual({});
  });

  it("has fancy typing", () => {
    const mapper = (value: number) => (value % 2 ? "odd" : "even");
    interface O {
      a: number;
      b: number;
    }
    type A = number[];
    interface Mapped {
      odd?: number;
      even?: number;
    }

    expectType<Mapped>(keyBy([1, 2], mapper));
    expectType<Mapped>(keyBy({ a: 1, b: 2 }, mapper));

    const oOrN = null as O | null;
    const oOrU = undefined as O | undefined;
    const aOrN = null as A | null;
    const aOrU = undefined as A | undefined;
    expectType<Mapped>(keyBy(oOrN, mapper));
    expectType<Mapped>(keyBy(oOrU, mapper));
    expectType<Mapped>(keyBy(aOrN, mapper));
    expectType<Mapped>(keyBy(aOrU, mapper));
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should ignore changes to `length`", () => {
    const array = [1];
    const spy = jasmine.createSpy().and.callFake(() => {
      array.push(2);
      return false;
    });

    keyBy(array, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should ignore added `object` properties", () => {
    const object: any = { a: 1 };
    const spy = jasmine.createSpy().and.callFake(() => {
      object.b = 2;
      return true;
    });

    keyBy(object, spy);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("should transform keys by `iteratee`", () => {
    const array = [{ dir: "left", code: 97 }, { dir: "right", code: 100 }];

    expect(keyBy(array, (object) => String.fromCharCode(object.code))).toEqual({
      a: { dir: "left", code: 97 },
      d: { dir: "right", code: 100 },
    });
  });

  it("should only add values to own, not inherited, properties", () => {
    const actual: any = keyBy([6.1, 4.2, 6.3], (n) =>
      Math.floor(n) > 4 ? "hasOwnProperty" : "constructor",
    );

    expect(actual.constructor).toEqual(4.2);
    expect(actual.hasOwnProperty).toEqual(6.3);
  });

  it("should work with an object for `collection`", () => {
    expect(keyBy({ a: 6.1, b: 4.2, c: 6.3 }, Math.floor)).toEqual({
      4: 4.2,
      6: 6.3,
    });
  });
});
