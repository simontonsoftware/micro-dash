import { round } from "./round";

describe("round()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return a rounded number without a precision", () => {
    expect(round(4.006)).toBe(4);
  });

  it("should work with a precision of `0`", () => {
    expect(round(4.006, 0)).toBe(4);
  });

  it("should work with a positive precision", () => {
    expect(round(4.016, 2)).toBe(4.02);
    expect(round(4.1, 2)).toBe(4.1);
  });

  it("should work with a negative precision", () => {
    expect(round(4160, -2)).toBe(4200);
  });

  it("should coerce `precision` to an integer", () => {
    expect(round(4.006, 0)).toBe(4);
    expect(round(4.016, 2.6)).toBe(4.02);
  });

  it("should work with exponential notation and `precision`", () => {
    expect(round(5e1, 2)).toBe(50);
  });
});
