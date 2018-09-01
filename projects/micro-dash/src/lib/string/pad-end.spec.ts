import { padEnd } from "./pad-end";

describe("padEnd()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const abc = "abc";

  it("should pad a string to a given length", () => {
    expect(padEnd(abc, 6)).toEqual("abc   ");
    expect(padEnd(abc, 6, undefined)).toEqual("abc   ");
  });

  it("should truncate pad characters to fit the pad length", () => {
    expect(padEnd(abc, 6, "_-")).toEqual("abc_-_");
  });

  it("should not pad if string is >= `length`", () => {
    expect(padEnd(abc, 2)).toEqual(abc);
    expect(padEnd(abc, 3)).toEqual(abc);
  });

  it("should treat negative `length` as `0`", () => {
    expect(padEnd(abc, 0)).toEqual(abc);
    expect(padEnd(abc, -2)).toEqual(abc);
  });

  it("should return `string` when `chars` is the empty string", () => {
    expect(padEnd(abc, 6, "")).toEqual(abc);
  });
});
