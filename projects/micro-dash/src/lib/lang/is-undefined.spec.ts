import { isUndefined } from "./is-undefined";

describe("isUndefined", () => {
  it("should return `true` for `undefined`", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  // tslint:disable-next-line:only-arrow-functions
  it("should return `false` for non `undefined` values", function() {
    // falsey values
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined(NaN)).toBe(false);
    expect(isUndefined("")).toBe(false);

    // all the other things
    expect(isUndefined(arguments)).toBe(false);
    expect(isUndefined([1, 2, 3])).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined(new Date())).toBe(false);
    expect(isUndefined(new Error())).toBe(false);
    expect(isUndefined(Array.prototype.slice)).toBe(false);
    expect(isUndefined({ a: 1 })).toBe(false);
    expect(isUndefined(1)).toBe(false);
    expect(isUndefined(/x/)).toBe(false);
    expect(isUndefined("a")).toBe(false);
    expect(isUndefined(Symbol("a"))).toBe(false);
  });
});
