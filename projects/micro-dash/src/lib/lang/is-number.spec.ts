import { isNumber } from "./is-number";

describe("isNumber()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return `true` for numbers", () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
  });

  // tslint:disable-next-line:only-arrow-functions
  it("should return `false` for non-numbers", function() {
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber(false)).toBe(false);
    expect(isNumber("")).toBe(false);
    expect(isNumber(arguments)).toBe(false);
    expect(isNumber([1, 2, 3])).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(new Date())).toBe(false);
    expect(isNumber(new Error())).toBe(false);
    expect(isNumber(Array.prototype.slice)).toBe(false);
    expect(isNumber({ a: 1 })).toBe(false);
    expect(isNumber(/x/)).toBe(false);
    expect(isNumber("a")).toBe(false);
    expect(isNumber(Symbol("a"))).toBe(false);
  });
});
