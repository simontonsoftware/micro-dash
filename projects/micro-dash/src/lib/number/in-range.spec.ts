import { inRange } from "./in-range";

describe("inRange()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should work with a `start` and `end`", () => {
    expect(inRange(1, 1, 5)).toBe(true);
    expect(inRange(3, 1, 5)).toBe(true);
    expect(inRange(0, 1, 5)).toBe(false);
    expect(inRange(5, 1, 5)).toBe(false);
  });

  it("should swap `start` and `end` when `start` > `end`", () => {
    expect(inRange(2, 5, 1)).toBe(true);
    expect(inRange(-3, -2, -6)).toBe(true);
  });

  it("should work with a floating point `n` value", () => {
    expect(inRange(1.2, 1, 5)).toBe(true);
    expect(inRange(0.5, 1, 5)).toBe(false);
  });
});
