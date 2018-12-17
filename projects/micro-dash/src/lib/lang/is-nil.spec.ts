import { Nil } from "../interfaces";
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

  it("fancily narrows types", () => {
    const maybeNull: string | null = "a";
    const maybeUndefined: string | undefined = "b";
    const maybeBoth: string | Nil = "c";

    let string: string;

    if (isNil(maybeNull)) {
      throw new Error("fail");
    } else {
      string = maybeNull;
    }
    expect(string).toBe("a");

    if (isNil(maybeUndefined)) {
      throw new Error("fail");
    } else {
      string = maybeUndefined;
    }
    expect(string).toBe("b");

    if (isNil(maybeBoth)) {
      throw new Error("fail");
    } else {
      string = maybeBoth;
    }
    expect(string).toBe("c");
  });
});
