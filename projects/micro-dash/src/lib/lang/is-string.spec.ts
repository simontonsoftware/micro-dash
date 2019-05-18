import { isString } from "./";

//
// stolen from https://github.com/healthiers/mini-dash
//

describe("isString()", () => {
  it("should pass for empty string", () => {
    expect(isString("")).toBe(true);
  });

  it("should pass for non-empty string", () => {
    expect(isString("foo bar foobar")).toBe(true);
  });

  it("should not pass for empty array", () => {
    expect(isString([])).toBe(false);
  });

  it("should not pass for non-empty array", () => {
    expect(isString([1, 2, 3])).toBe(false);
  });

  it("should not pass for null", () => {
    expect(isString(null)).toBe(false);
  });

  it("should not pass for undefined", () => {
    /* eslint-disable no-undefined */
    expect(isString(undefined)).toBe(false);
  });

  it("should not pass for number", () => {
    expect(isString(3)).toBe(false);
  });

  it("should not pass for boolean", () => {
    expect(isString(true)).toBe(false);
  });

  it("should not pass for empty object", () => {
    expect(isString({})).toBe(false);
  });

  it("should not pass for object", () => {
    expect(isString({ a: 1, b: 2 })).toBe(false);
  });

  it("should not pass for object with numeric keys", () => {
    expect(isString({ 0: "foobar", 1: "foo", 2: "bar" })).toBe(false);
  });

  it("should not pass for a function", () => {
    expect(
      isString(() => {
        /* empty */
      }),
    ).toBe(false);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return `true` for strings", () => {
    expect(isString("a")).toBe(true);
  });

  // tslint:disable-next-line:only-arrow-functions
  it("should return `false` for non-strings", function() {
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString(false)).toBe(false);
    expect(isString(0)).toBe(false);
    expect(isString(NaN)).toBe(false);
    expect(isString("")).toBe(true);

    expect(isString(arguments)).toBe(false);
    expect(isString([1, 2, 3])).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(new Date())).toBe(false);
    expect(isString(new Error())).toBe(false);
    expect(isString(Array.prototype.slice)).toBe(false);
    expect(isString({ "0": 1, length: 1 })).toBe(false);
    expect(isString(1)).toBe(false);
    expect(isString(/x/)).toBe(false);
    expect(isString(Symbol("a"))).toBe(false);
  });
});
