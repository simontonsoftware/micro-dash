import { isString } from "../lang";
import { remove } from "./remove";

describe("remove()", () => {
  it("fancily narrows types", () => {
    const removed: string[] = remove(["a", undefined, 3], isString);
    expect(removed).toEqual(["a"]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should modify the array and return removed elements", () => {
    const argument = [1, 2, 3, 4];

    const returned = remove(argument, isEven);

    expect(argument).toEqual([1, 3]);
    expect(returned).toEqual([2, 4]);
  });

  it("should provide correct `predicate` arguments", () => {
    const argument = [1, 2, 3];
    const log: Array<[number, number]> = [];

    remove(argument, (value, index) => {
      log.push([value, index]);
      return isEven(value);
    });

    expect(log).toEqual([[3, 2], [2, 1], [1, 0]]);
  });

  it("should preserve holes in arrays", () => {
    const array = [1, 2, 3, 4];
    delete array[1];
    delete array[3];

    remove(array, (n) => n === 1);

    expect(0 in array).toBeFalsy();
    expect(1 in array).toBeTruthy();
    expect(2 in array).toBeFalsy();
  });

  it("should treat holes as `undefined`", () => {
    const array = [1, 2, 3];
    delete array[1];

    remove(array, (n) => n == null);

    expect(array).toEqual([1, 3]);
  });

  it("should pass original indexes to `predicate`", () => {
    const array = [1, 2, 3];

    remove(array, (_n, index) => isEven(index));

    expect(array).toEqual([2]);
  });

  function isEven(i: number) {
    return i % 2 === 0;
  }
});
