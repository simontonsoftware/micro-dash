import { isNil } from "./is-nil";

describe("isNil()", () => {
  it("works", () => {
    expect(isNil(undefined)).toBe(true);
    expect(isNil(null)).toBe(true);

    expect(isNil(false)).toBe(false);
    expect(isNil(0)).toBe(false);
    expect(isNil("")).toBe(false);
    expect(isNil({})).toBe(false);
  });
});
