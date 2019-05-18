import { expectType } from "s-ng-dev-utils";
import { get } from "./get";

class Wrap1 {
  value?: number;
}

class Wrap2 {
  wrap1 = new Wrap1();
}

class Wrap3 {
  wrap2 = new Wrap2();
}

class Wrap4 {
  wrap3 = new Wrap3();
}

describe("get()", () => {
  it("should know that `get` cannot return `undefined` when a default value is given", () => {
    expectType<number>(get(new Wrap1(), ["value"], 1));
    expectType<number>(get(new Wrap2(), ["wrap1", "value"], 1));
    expectType<number>(get(new Wrap3(), ["wrap2", "wrap1", "value"], 1));
    expectType<number>(
      get(new Wrap4(), ["wrap3", "wrap2", "wrap1", "value"], 1),
    );
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should get string keyed property values", () => {
    expect(get({ a: 1 }, ["a"])).toBe(1);
  });

  it("should get deep property values", () => {
    expect(get({ a: { b: 2 } }, ["a", "b"])).toBe(2);
  });

  it("should handle empty paths", () => {
    const result: undefined = get({}, []);
    expect(result).toBeUndefined();
    expect(get({ "": 3 }, [""])).toBe(3);
  });

  it("should handle complex paths", () => {
    expect(
      get(
        {
          a: {
            "-1.23": {
              '["b"]': { c: { "['d']": { "\ne\n": { f: { g: 8 } } } } },
            },
          },
        },
        ["a", "-1.23", '["b"]', "c", "['d']", "\ne\n", "f", "g"],
      ),
    ).toBe(8);
  });

  it("should return `undefined` when `object` is nullish", () => {
    expect(get(undefined, ["constructor"])).toBeUndefined();
    expect(get(null, ["constructor"])).toBeUndefined();
  });

  it("is `undefined` for deep paths when `object` is nullish", () => {
    const path = ["constructor", "prototype", "valueOf"];

    expect(get(null, path)).toBeUndefined();
    expect(get(undefined, path)).toBeUndefined();
  });

  it("should return `undefined` if parts of `path` are missing", () => {
    expect(get({ a: [, null] }, ["a", "1", "b", "c"])).toBeUndefined();
  });

  it("should be able to return `null` values", () => {
    expect(get({ a: { b: null } }, ["a", "b"])).toBeNull();
  });

  it("should return the default value for `undefined` values", () => {
    const object = { a: {} };
    const path = ["a", "b"];
    const values = [
      [],
      {},
      null,
      undefined,
      false,
      0,
      NaN,
      "",
      true,
      new Date(),
      1,
      /x/,
      "a",
    ];

    for (const value of values) {
      expect(get(object, path, value)).toEqual(value);
      expect(get(null, path, value)).toEqual(value);
    }
  });

  it("should return the default value when `path` is empty", () => {
    expect(get({}, [], "a")).toBe("a");
  });
});
