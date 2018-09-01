import { toLower } from "./to-lower";

describe("toLower()", () => {
  it("should convert whole string to lower case", () => {
    expect(toLower("--Foo-Bar--")).toBe("--foo-bar--");
    expect(toLower("fooBar")).toBe("foobar");
    expect(toLower("__FOO_BAR__")).toBe("__foo_bar__");
  });

  it("should return an empty string for empty values", () => {
    expect(toLower("")).toBe("");
  });
});
