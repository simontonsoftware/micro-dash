import { flatten, identity, times } from "lodash-es";
import { uniqBy } from "./uniq-by";

describe("uniqBy()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  const objects = [{ a: 2 }, { a: 3 }, { a: 1 }, { a: 2 }, { a: 3 }, { a: 1 }];

  it("should work with an `iteratee`", () => {
    expect(uniqBy(objects, (object) => object.a)).toEqual(objects.slice(0, 3));
  });

  it("should work with large arrays", () => {
    const largeArray = times(200, () => [1, 2]);

    const actual = uniqBy(largeArray, String);
    expect(actual[0]).toBe(largeArray[0]);
    expect(actual).toEqual([[1, 2]]);
  });

  it("should provide correct `iteratee` arguments", () => {
    const spy = jasmine.createSpy();
    uniqBy(objects, spy);
    expect(spy.calls.first().args).toEqual([objects[0]]);
  });

  it("should return unique values of an unsorted array", () => {
    expect(uniqBy([2, 1, 2], identity)).toEqual([2, 1]);
  });

  it("should return unique values of a sorted array", () => {
    expect(uniqBy([1, 2, 2], identity)).toEqual([1, 2]);
  });

  it("should treat object instances as unique", () => {
    expect(uniqBy(objects, identity)).toEqual(objects);
  });

  it("should match `NaN`", () => {
    expect(uniqBy([NaN, NaN], identity)).toEqual([NaN]);
  });

  it("should work with large arrays", () => {
    testLargeArray(0, {}, "a");
  });

  it("should work with large arrays of boolean, `NaN`, and nullish values", () => {
    testLargeArray(null, undefined, false, true, NaN);
  });

  it("should work with large arrays of symbols", () => {
    const largeArray = times(200, Symbol);
    expect(uniqBy(largeArray, identity)).toEqual(largeArray);
  });

  it("should work with large arrays of well-known symbols", () => {
    // See http://www.ecma-international.org/ecma-262/6.0/#sec-well-known-symbols.
    testLargeArray(
      Symbol.hasInstance,
      Symbol.isConcatSpreadable,
      Symbol.iterator,
      Symbol.match,
      Symbol.replace,
      Symbol.search,
      Symbol.species,
      Symbol.split,
      Symbol.toPrimitive,
      Symbol.toStringTag,
      Symbol.unscopables,
    );
  });

  it("should distinguish between numbers and numeric strings", () => {
    testLargeArray("2", 2);
  });
});

function testLargeArray(...values: any[]) {
  const largeArray = flatten(
    values.map((value) => times(Math.ceil(200 / values.length), () => value)),
  );
  expect(uniqBy(largeArray, identity)).toEqual(values);
}
