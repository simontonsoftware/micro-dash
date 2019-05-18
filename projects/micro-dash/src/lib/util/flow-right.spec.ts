import { curry, head, identity } from "lodash";
import { flowRight } from "./flow-right";

describe("flowRight()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should supply each function with the return value of the previous", () => {
    const increment = (x: number) => x + 1;
    const square = (x: number) => x * x;
    const fixed = (n: number) => n.toFixed(1);

    expect(
      flowRight(
        fixed,
        square,
        increment,
      )(2),
    ).toBe("9.0");
  });

  it("should return an identity function when no arguments are given", () => {
    expect(flowRight()("a")).toBe("a");
  });

  it("should work with a curried function and `_.head`", () => {
    const curried: any = curry(identity);
    const combined: any = flowRight(
      head as any,
      curried,
    );

    expect(combined([1])).toBe(1);
  });
});
