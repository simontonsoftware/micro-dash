import { once } from "./once";

describe("once()", () => {
  it("has fancy typing", () => {
    const a: any = 0;
    const fn = once((a1: number, a2: string) => new Date());
    const args: [number, string] = a as Parameters<typeof fn>;
    const ret: Date = a as ReturnType<typeof fn>;
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should invoke `func` once", () => {
    let count = 0;

    const oncedFn = once(() => ++count);
    oncedFn();
    expect(oncedFn()).toBe(1);
    expect(count).toBe(1);
  });

  it("should ignore recursive calls", () => {
    let count = 0;

    const oncedFn = once(() => {
      oncedFn();
      return ++count;
    });
    expect(oncedFn()).toBe(1);
    expect(count).toBe(1);
  });

  it("should not throw more than once", () => {
    const oncedFn = once(() => {
      throw new Error();
    });

    expect(oncedFn).toThrowError();
    expect(oncedFn).not.toThrowError();
  });
});
