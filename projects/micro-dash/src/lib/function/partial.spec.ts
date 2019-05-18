import { identity } from "lodash";
import { curry } from "./curry";
import { partial } from "./partial";

describe("partial()", () => {
  it("does not alter the `this` binding", () => {
    function fn(this: any) {
      return this;
    }

    expect(partial(fn.bind(2))()).toBe(2);
    expect(partial(fn)()).toBe(undefined);
  });

  it("sets the `length` property", () => {
    const fn = (a: any, b: any, c: any) => {};

    expect(partial(fn).length).toBe(3);
    expect(partial(fn, 1).length).toBe(2);
    expect(partial(fn, 1, 2).length).toBe(1);
    expect(partial(fn, 1, 2, 3).length).toBe(0);
  });

  it("has super fancy typing", () => {
    const fn0 = () => "hi";
    const p00: () => string = partial(fn0);

    const fn1 = (str: string) => Number(str);
    const p10: (a: string) => number = partial(fn1);
    const p11: () => number = partial(fn1, "1");

    const fn2 = (a: number, b: string) => a + b;
    const p20: (a: number, b: string) => string = partial(fn2);
    const p21: (b: string) => string = partial(fn2, 1);
    const p22: (b: string) => string = partial(fn2, 1, "2");

    const fn3 = (a: number, b: number, c: string) => a + b + c;
    const p30: (a: number, b: number, c: string) => string = partial(fn3);
    const p31: (b: number, c: string) => string = partial(fn3, 1);
    const p32: (c: string) => string = partial(fn3, 1, 2);
    const p33: () => string = partial(fn3, 1, 2, "3");

    const fn4 = (a: number, b: number, c: number, d: string) => a + b + c + d;
    const p40: (a: number, b: number, c: number, d: string) => string = partial(
      fn4,
    );
    const p41: (b: number, c: number, d: string) => string = partial(fn4, 1);
    const p42: (c: number, d: string) => string = partial(fn4, 1, 2);
    const p43: (d: string) => string = partial(fn4, 1, 2, 3);
    const p44: () => string = partial(fn4, 1, 2, 3, "4");

    const fn5 = (a: number, b: number, c: number, d: number, e: string) =>
      a + b + c + d + e;
    const p55: () => string = partial(fn5, 1, 2, 3, 4, "5");
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("partially applies arguments", () => {
    expect(partial(identity as (value: string) => string, "a")()).toBe("a");
  });

  it("creates a function that can be invoked with additional arguments", () => {
    const fn = (a: string, b: string) => [a, b];

    const par = partial(fn, "a");

    expect(par("b")).toEqual(["a", "b"]);
  });

  it("works when there are no partially applied arguments and the created function is invoked without additional arguments", () => {
    // tslint:disable-next-line:only-arrow-functions
    const fn = function() {
      return arguments.length;
    };

    const par = partial(fn);

    expect(par()).toBe(0);
  });

  it("works when there are no partially applied arguments and the created function is invoked with additional arguments", () => {
    expect(partial(identity as (value: string) => string)("a")).toBe("a");
  });

  it("should ensure `new par` is an instance of `func`", () => {
    const object = {};
    function Foo(value = false) {
      return value && object;
    }

    const par = partial(Foo);

    expect(new (par as any)() instanceof Foo).toBeTruthy();
    expect(new (par as any)(true)).toBe(object);
  });

  it("should clone metadata for created functions", () => {
    function greet(greeting: string, name: string) {
      return greeting + " " + name;
    }

    const par1 = partial(greet, "hi");
    const par2 = partial(par1, "barney");
    const par3 = partial(par1, "pebbles");

    expect(par1("fred")).toBe("hi fred");
    expect(par2()).toBe("hi barney");
    expect(par3()).toBe("hi pebbles");
  });

  it("should work with curried functions", () => {
    const fn = (a: number, b: number, c: number) => a + b + c;
    const curried = curry(partial(fn, 1), 2);

    expect(curried(2, 3)).toBe(6);
    expect(curried(2)(3)).toBe(6);
  });
});
