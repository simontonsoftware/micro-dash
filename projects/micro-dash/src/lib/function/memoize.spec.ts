import { identity, isFunction, noop } from "lodash";
import { memoize } from "./memoize";

describe("memoize()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should memoize results based on the first argument given", () => {
    const memoized = memoize((a: number, b: number, c: number) => a + b + c);

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(1, 3, 5)).toBe(6);
  });

  it("should support a `resolver`", () => {
    const fn = (a: number, b: number, c: number) => a + b + c;

    const memoized = memoize(fn, fn);

    expect(memoized(1, 2, 3)).toBe(6);
    expect(memoized(1, 3, 5)).toBe(9);
  });

  it("should use `this` binding of function for `resolver`", () => {
    function fn(this: any, a: number) {
      return a + this.b + this.c;
    }

    const memoized = memoize(fn, fn);

    const object = { memoized, b: 2, c: 3 };
    expect(object.memoized(1)).toBe(6);

    object.b = 3;
    object.c = 5;
    expect(object.memoized(1)).toBe(9);
  });

  it("should not error if `resolver` is nullish", () => {
    expect(isFunction(memoize(noop))).toBeTruthy();
    expect(isFunction(memoize(noop, null as any))).toBeTruthy();
    expect(isFunction(memoize(noop, undefined))).toBeTruthy();
  });

  it("should check cache for own properties", () => {
    const props = [
      "constructor",
      "hasOwnProperty",
      "isPrototypeOf",
      "propertyIsEnumerable",
      "toLocaleString",
      "toString",
      "valueOf",
    ];

    const memoized = memoize(identity);

    for (const value of props) {
      expect(memoized(value)).toBe(value);
    }
  });

  it("should cache the `__proto__` key", () => {
    const array: any[] = [];
    const key = "__proto__";
    let count = 0;

    function func(_arg: any) {
      ++count;
      return array;
    }

    let memoized = memoize(func);
    memoized(key);
    memoized(key);
    expect(count).toBe(1);
    expect(memoized.cache.get(key)).toBe(array);
    expect(memoized.cache.delete(key)).toBe(true);

    memoized = memoize(func, identity);
    memoized(key);
    memoized(key);
    expect(count).toBe(2);
    expect(memoized.cache.get(key)).toBe(array);
    expect(memoized.cache.delete(key)).toBe(true);
  });
});
