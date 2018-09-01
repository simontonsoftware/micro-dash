import { constant } from "lodash";
import { stub } from "sinon";
import { set } from "./set";

describe("set()", () => {
  it("creates an array (only) for missing integer keys", () => {
    const object: any[] = [];
    set(object, [1, "b", 3.7, 4], value);
    expect(object).toEqual([, { b: { "3.7": [, , , , value] } }]);
  });

  /** documented difference from lodash */
  it("assigns values even if they are the same as their destination", () => {
    for (const equalValue of ["a", ["a"], { a: 1 }, NaN]) {
      const object = {};
      const setter = stub();
      const theValue = constant(equalValue);
      Object.defineProperty(object, "a", {
        configurable: true,
        enumerable: true,
        get: theValue,
        set: setter,
      });

      set(object, ["a"], theValue);

      expect(setter.callCount).toBe(1);
    }
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  const oldValue = 1;
  const value = 2;

  it("should set property values", () => {
    const object = { a: oldValue };

    const returned = set(object, ["a"], value);

    expect(returned).toBe(object);
    expect(object.a).toBe(value);
  });

  it("should set deep property values", () => {
    const object = { a: { b: oldValue } };

    const actual = set(object, ["a", "b"], value);

    expect(actual).toBe(object);
    expect(object.a.b).toBe(value);
  });

  it("should not coerce array paths to strings", () => {
    const object = { "a,b,c": 1, a: { b: { c: 1 } } };
    set(object, ["a", "b", "c"], value);
    expect(object.a.b.c).toBe(value);
  });

  it("should handle empty paths", () => {
    const object = {};

    set(object, [], value);
    expect(object).toEqual({});

    set(object, [""], value);
    expect(object).toEqual({ "": value });
  });

  it("should handle complex paths", () => {
    const object = {
      a: {
        "-1.23": {
          '["b"]': { c: { "['d']": { "\ne\n": { f: { g: oldValue } } } } },
        },
      },
    };
    const path = ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"];

    set(object, path, value);

    expect(object.a["-1.23"]['["b"]'].c["['d']"]["\ne\n"].f.g).toBe(value);
  });

  it("should create parts of `path` that are missing", () => {
    const object: any = {};

    const actual = set(object, ["a", "1", "b", "c"], value);

    expect(actual).toBe(object);
    expect(actual).toEqual({ a: { "1": { b: { c: value } } } });
    expect("0" in object.a).toBe(false);
  });

  it("should not error when `object` is nullish", () => {
    expect(set(null, ["a", "b"], value)).toEqual(null);
    expect(set(undefined, ["a", "b"], value)).toEqual(undefined);
  });

  it("should overwrite primitives in the path", () => {
    const object: any = { a: "" };
    set(object, ["a", "b"], value);
    expect(object).toEqual({ a: { b: 2 } });
  });

  it("should not create an array for missing non-index property names that start with numbers", () => {
    const object = {};
    set(object, ["1a", "2b", "3c"], value);
    expect(object).toEqual({ "1a": { "2b": { "3c": value } } });
  });
});
