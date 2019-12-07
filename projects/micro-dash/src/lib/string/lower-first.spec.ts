import { lowerFirst } from "./lower-first";

describe("lowerFirst()", () => {
  it("should lowercase only the first character", () => {
    expect(lowerFirst("fred")).toBe("fred");
    expect(lowerFirst("Fred")).toBe("fred");
    expect(lowerFirst("FRED")).toBe("fRED");
  });

  it("should return an empty string for empty values", () => {
    expect(lowerFirst(null)).toBe("");
    expect(lowerFirst(undefined)).toBe("");
    expect(lowerFirst("")).toBe("");
  });
});
