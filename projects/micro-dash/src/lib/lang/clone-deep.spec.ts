import { isObject } from "lodash";
import { toPairs } from "lodash-es";
import { cloneDeep } from "./clone-deep";

describe("cloneDeep()", () => {
  it("clones deeply", () => {
    const object = {
      a: { b: [{ c: 3 }, [{ d: 4 }]] as [{ c: 3 }, [{ d: 4 }]] },
    };

    const cloned = cloneDeep(object);

    expect(cloned).toEqual(object);
    expect(cloned.a).not.toBe(object.a);
    expect(cloned.a.b).not.toBe(object.a.b);
    expect(cloned.a.b[1]).not.toBe(object.a.b[1]);
    expect(cloned.a.b[1][0].d).toBe(4);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

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
      const actual = cloneDeep(object);

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

    const actual = cloneDeep(object);

    expect(actual).toEqual(object);
    expect(actual).not.toBe(object);
  });

  it("works for methods like `map`", () => {
    const expected: any[] = [{ a: [0] }, { b: [1] }];

    const actual = expected.map(cloneDeep);

    expect(actual).toEqual(expected);
    expect(actual[0]).not.toBe(expected[0]);
    expect(actual[0].a).not.toBe(expected[0].a);
    expect(actual[1].b).not.toBe(expected[1].b);
  });
});
