import { pad } from "./pad";

describe("pad()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const abc = "abc";

  it("should pad a string to a given length", () => {
    expect(pad(abc, 6)).toEqual(" abc  ");
    expect(pad(abc, 6, undefined)).toEqual(" abc  ");
  });

  it("should truncate pad characters to fit the pad length", () => {
    expect(pad(abc, 8)).toEqual("  abc   ");
    expect(pad(abc, 8, "_-")).toEqual("_-abc_-_");
  });

  it("should not pad if string is >= `length`", () => {
    expect(pad(abc, 2)).toEqual(abc);
    expect(pad(abc, 3)).toEqual(abc);
  });

  it("should treat negative `length` as `0`", () => {
    expect(pad(abc, 0)).toEqual(abc);
    expect(pad(abc, -2)).toEqual(abc);
  });

  it("should return `string` when `chars` is the empty string", () => {
    expect(pad(abc, 6, "")).toEqual(abc);
  });
});
