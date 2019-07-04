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

class Cycle {
  next = new Cycle();
}

describe("get()", () => {
  it("has fancy typing", () => {
    expectType<number | undefined>(get(new Wrap1(), ["value"]));
    expectType<number>(get(new Wrap1(), ["value"], 1));

    expectType<Wrap1>(get(new Wrap2(), ["wrap1"]));
    expectType<number | undefined>(get(new Wrap2(), ["wrap1", "value"]));

    expectType<Wrap1>(get(new Wrap3(), ["wrap2", "wrap1"]));
    expectType<number | undefined>(
      get(new Wrap3(), ["wrap2", "wrap1", "value"]),
    );
    expectType<number>(get(new Wrap3(), ["wrap2", "wrap1", "value"], 1));

    expectType<Cycle>(get(new Cycle(), ["next", "next", "next", "next"]));
    expectType<any>(get(new Cycle(), ["next", "next", "next", "next", "next"]));

    // when D is a different type than at the path
    expectType<Wrap1>(get(new Wrap3(), ["wrap2", "wrap1"], "hi"));
    expectType<number | string>(get(new Wrap2(), ["wrap1", "value"], "hi"));

    // when T can be nil
    const wOrU = undefined as Wrap3 | undefined;
    const wOrN = null as Wrap3 | null;
    expectType<Wrap1 | undefined>(get(wOrU, ["wrap2", "wrap1"]));
    expectType<Wrap1 | undefined>(get(wOrN, ["wrap2", "wrap1"]));

    // fallback to `any` for e.g. a string array
    const path = ["a", "b"];
    expectType<any>(get(new Cycle(), path));
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
    expect(get<any>(undefined, ["constructor"])).toBeUndefined();
    expect(get<any>(null, ["constructor"])).toBeUndefined();
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
