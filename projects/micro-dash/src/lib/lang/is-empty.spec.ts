import { isEmpty } from "./is-empty";

describe("isEmpty()", () => {
  it("should return `true` for empty values", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty(null)).toBe(true);
    expect(isEmpty(undefined)).toBe(true);
    expect(isEmpty(false)).toBe(true);
    expect(isEmpty(0)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
    expect(isEmpty("")).toBe(true);
    expect(isEmpty(true)).toBe(true);
    expect(isEmpty(1)).toBe(true);
    expect(isEmpty(NaN)).toBe(true);
  });

  it("should return `false` for non-empty values", () => {
    expect(isEmpty([0])).toBe(false);
    expect(isEmpty({ a: 0 })).toBe(false);
    expect(isEmpty("a")).toBe(false);
  });

  it("should work with an object that has a `length` property", () => {
    expect(isEmpty({ length: 0 })).toBe(false);
  });
});
