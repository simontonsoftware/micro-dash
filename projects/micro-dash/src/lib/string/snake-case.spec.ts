import { snakeCase } from "./snake-case";

describe("snakeCase()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const strings = [
    "foo bar",
    "Foo bar",
    "foo Bar",
    "Foo Bar",
    "FOO BAR",
    "fooBar",
    "--foo-bar--",
    "__foo_bar__",
  ];

  it("should convert `string` to snake case", () => {
    for (const str of strings) {
      expect(snakeCase(str)).toBe("foo_bar");
    }
  });

  it("should handle double-converting strings", () => {
    for (const str of strings) {
      expect(snakeCase(snakeCase(str))).toBe("foo_bar");
    }
  });

  it("should remove Latin mathematical operators", () => {
    expect(snakeCase("\xd7")).toBe("");
    expect(snakeCase("\xf7")).toBe("");
  });

  it("should return an empty string for empty values", () => {
    expect(snakeCase("")).toBe("");
  });
});
