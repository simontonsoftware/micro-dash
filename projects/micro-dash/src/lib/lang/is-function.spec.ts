import { isFunction } from "./is-function";

describe("isFunction()", () => {
  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return `true` for functions", () => {
    expect(isFunction(Array.prototype.slice)).toBe(true);
  });

  it("should return `true` for async functions", () => {
    expect(isFunction(async () => {})).toBe(true);
  });

  it("should return `true` for generator functions", () => {
    expect(isFunction(function*(): IterableIterator<any> {})).toBe(true);
  });

  it("should return `true` for the `Proxy` constructor", () => {
    expect(isFunction(Proxy)).toBe(true);
  });

  it("should return `true` for array view constructors", () => {
    expect(isFunction(Float32Array)).toBe(true);
    expect(isFunction(Float64Array)).toBe(true);
    expect(isFunction(Int8Array)).toBe(true);
    expect(isFunction(Int16Array)).toBe(true);
    expect(isFunction(Int32Array)).toBe(true);
    expect(isFunction(Uint8Array)).toBe(true);
    expect(isFunction(Uint16Array)).toBe(true);
    expect(isFunction(Uint32Array)).toBe(true);
    expect(isFunction(DataView)).toBe(true);
  });

  it("should return `false` for non-functions", function() {
    expect(isFunction(undefined)).toBe(false);
    expect(isFunction(null)).toBe(false);
    expect(isFunction(false)).toBe(false);
    expect(isFunction(0)).toBe(false);
    expect(isFunction(NaN)).toBe(false);
    expect(isFunction("")).toBe(false);

    expect(isFunction(arguments)).toBe(false);
    expect(isFunction([1, 2, 3])).toBe(false);
    expect(isFunction(true)).toBe(false);
    expect(isFunction(new Date())).toBe(false);
    expect(isFunction(new Error())).toBe(false);
    expect(isFunction({ a: 1 })).toBe(false);
    expect(isFunction(1)).toBe(false);
    expect(isFunction(/x/)).toBe(false);
    expect(isFunction("a")).toBe(false);
    expect(isFunction(Symbol("a"))).toBe(false);

    expect(isFunction(document.getElementsByTagName("body"))).toBe(false);
  });

  it("should return `false` for subclassed values", () => {
    function Foo() {}
    Foo.prototype = Function;
    expect(isFunction(new (Foo as any)())).toBe(false);
  });
});
