import { capitalize } from "./capitalize";

describe("capitalize()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should capitalize the first character of a string", () => {
    expect(capitalize("fred")).toBe("Fred");
    expect(capitalize("Fred")).toBe("Fred");
    expect(capitalize(" fred")).toBe(" fred");
  });

  it("should return an empty string for empty values", () => {
    expect(capitalize("")).toBe("");
  });
});
