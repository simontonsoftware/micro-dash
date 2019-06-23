import { isObject } from "lodash";
import { toPairs } from "lodash-es";
import { clone } from "./clone";

describe("clone()", () => {
  //
  // stolen from https://github.com/healthiers/mini-dash
  //

  it("should return an empty object if empty given", () => {
    expect(clone({})).toEqual({});
  });

  it("should return an object with the same properties", () => {
    expect(clone({ a: 1, b: 2, c: 3 })).toEqual({ a: 1, b: 2, c: 3 });
  });

  it("should return an object with nested properties", () => {
    expect(clone({ a: 1, b: { foo: "bar" }, c: { bar: "foo" } })).toEqual({
      a: 1,
      b: { foo: "bar" },
      c: { bar: "foo" },
    });
  });

  it("should not mutate the original object", () => {
    const object = { a: 1, b: 2, c: 3 };
    const result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
  });

  it("should shallow clone", () => {
    const object = { a: 1, b: { foo: "bar" }, c: { bar: "foo" } };
    const result = clone(object);

    expect(result).toEqual(object);
    expect(result).not.toBe(object);
    expect(result.b).toBe(object.b);
    expect(result.c).toBe(object.c);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should perform a shallow clone", () => {
    const array = [{ a: 0 }, { b: 1 }];

    const actual = clone(array);

    expect(actual).toEqual(array);
    expect(actual).not.toBe(array);
    expect(actual[0]).toBe(array[0]);
  });

  const clonable = {
    arrays: ["a", ""],
    "array-like objects": { "0": "a", length: 1 },
    booleans: false,
    "null values": null,
    numbers: 0,
    objects: { a: 0, b: 1, c: 2 },
    strings: "a",
    "undefined values": undefined,
    "objects with object values": { b: ["B"], c: { C: 1 } },
  };
  for (const [kind, object] of toPairs(clonable)) {
    it("should clone " + kind, () => {
      const actual = clone(object);

      expect(actual).toEqual(object);
      if (isObject(object)) {
        expect(actual).not.toBe(object);
      } else {
        expect(actual).toBe(object);
      }
    });
  }

  it("clones properties that shadow those on `Object.prototype`", () => {
    const object = {
      constructor: 1,
      hasOwnProperty: 2,
      isPrototypeOf: 3,
      propertyIsEnumerable: 4,
      toLocaleString: 5,
      toString: 6,
      valueOf: 7,
    };

    const actual = clone(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it("works for methods like `map`", () => {
    const expected: any[] = [{ a: [0] }, { b: [1] }];

    const actual = expected.map(clone);

    expect(actual).toEqual(expected);
    expect(actual[0]).not.toBe(expected[0]);
    expect(actual[0].a).toBe(expected[0].a);
    expect(actual[1].b).toBe(expected[1].b);
  });
});
