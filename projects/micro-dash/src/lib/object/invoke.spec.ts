import { expectType } from "s-ng-dev-utils";
import { Nil } from "../interfaces";
import { invoke } from "./invoke";

describe("invoke()", () => {
  it("sets the context correctly when only 1 deep", () => {
    const spy = jasmine.createSpy();
    const obj = { a: spy };

    invoke(obj, ["a"]);

    expect(spy.calls.first().object).toBe(obj);
  });

  it("has fancy typing", () => {
    // empty path
    expectType<undefined>(invoke({ a: () => 1 }, []));
    expectType<undefined>(invoke({} as { a: () => string } | undefined, []));

    // 1 element path
    expectType<number>(invoke({ a: () => 1 }, ["a"]));
    expectType<boolean>(invoke({ a: (a: boolean) => a }, ["a"], true));
    expectType<string | undefined>(invoke({} as { a?: () => string }, ["a"]));
    expectType<string | undefined>(
      invoke({} as { a: () => string } | Nil, ["a"]),
    );

    // 2 element path
    expectType<number>(invoke({ a: { b: () => 1 } }, ["a", "b"]));
    expectType<boolean>(
      invoke({ a: { b: (a: boolean) => a } }, ["a", "b"], true),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b?: () => string } }, ["a", "b"]),
    );
    expectType<string | undefined>(
      invoke({} as { a?: { b: () => string } }, ["a", "b"]),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: () => string } } | Nil, ["a", "b"]),
    );

    // 3 element path
    const path3: ["a", "b", "c"] = ["a", "b", "c"];
    expectType<number>(invoke({ a: { b: { c: () => 1 } } }, path3));
    expectType<boolean>(
      invoke({ a: { b: { c: (a: boolean) => a } } }, path3, true),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: { c?: () => string } } }, path3),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b?: { c: () => string } } }, path3),
    );
    expectType<string | undefined>(
      invoke({} as { a?: { b: { c: () => string } } }, path3),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: { c: () => string } } } | Nil, path3),
    );

    // 4 element path
    const path4: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
    expectType<number>(invoke({ a: { b: { c: { d: () => 1 } } } }, path4));
    expectType<boolean>(
      invoke({ a: { b: { c: { d: (a: boolean) => a } } } }, path4, true),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: { c: { d?: () => string } } } }, path4),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: { c?: { d: () => string } } } }, path4),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b?: { c: { d: () => string } } } }, path4),
    );
    expectType<string | undefined>(
      invoke({} as { a?: { b: { c: { d: () => string } } } }, path4),
    );
    expectType<string | undefined>(
      invoke({} as { a: { b: { c: { d: () => string } } } } | Nil, path4),
    );

    // fallback: n element path
    const pathN: string[] = ["a"];
    expectType<any>(invoke({ a: () => 1 }, pathN));

    expect().nothing();
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should invoke a method on `object`", () => {
    expect(invoke({ a: () => "A" }, ["a"])).toBe("A");
  });

  it("should support invoking with arguments", () => {
    const obj = { a: (a: any, b: any) => [a, b] };
    expect(invoke(obj, ["a"], 1, 2)).toEqual([1, 2]);
  });

  it("should not error on nullish elements", () => {
    expect(invoke(null, ["a", "b"], 1, 2)).toBeUndefined();
    expect(invoke(undefined, ["a", "b"], 1, 2)).toBeUndefined();
  });

  it("should support deep paths", () => {
    const obj = { a: { b: (a: any, b: any) => [a, b] } };
    expect(invoke(obj, ["a", "b"], 1, 2)).toEqual([1, 2]);
  });

  it("should invoke deep property methods with the correct `this` binding", () => {
    const obj = {
      a: {
        b() {
          return this.c;
        },
        c: 1,
      },
    };
    expect(invoke(obj, ["a", "b"])).toBe(1);
  });
});
