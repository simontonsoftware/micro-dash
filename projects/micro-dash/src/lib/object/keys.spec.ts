import { keys } from "./keys";

describe("keys()", () => {
  // tslint:disable-next-line:only-arrow-functions
  it("makes no special accommodations for `arguments` objects (unlike lodash)", function() {
    expect(keys(arguments).sort()).toEqual(["callee", "length"]);
  });

  it("includes the `constructor` property on prototype objects (unlike lodash)", () => {
    function Foo() {}
    Foo.prototype.a = 1;

    expect(keys(Foo.prototype)).toEqual(["constructor", "a"]);
  });

  //
  // stolen from https://github.com/lodash/lodash
  //

  it("should return the string keyed property names of `object`", () => {
    expect(keys({ a: 1, b: 1 }).sort()).toEqual(["a", "b"]);
  });

  it("should not include inherited string keyed properties", () => {
    function Foo(this: any) {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    expect(keys(new (Foo as any)()).sort()).toEqual(["a"]);
  });

  it("should return keys for custom properties on arrays", () => {
    const array = [1];
    (array as any).a = 1;

    expect(keys(array).sort()).toEqual(["0", "a", "length"]);
  });

  it("should not include inherited string keyed properties of arrays", () => {
    (Array.prototype as any).a = 1;
    expect(keys([1]).sort()).toEqual(["0", "length"]);
    delete (Array.prototype as any).a;
  });

  it("should return keys for custom properties on `arguments` objects", () => {
    // tslint:disable-next-line:only-arrow-functions
    const args: any = (function(..._: any[]) {
      return arguments;
    })(1, 2, 3);
    args.a = 1;
    expect(keys(args).sort()).toEqual(["0", "1", "2", "a", "callee", "length"]);
  });

  it("should not include inherited string keyed properties of `arguments` objects", () => {
    (Object.prototype as any).a = 1;
    // tslint:disable-next-line:only-arrow-functions
    const args: any = (function(..._: any[]) {
      return arguments;
    })(1, 2, 3);

    expect(keys(args).sort()).toEqual(["0", "1", "2", "callee", "length"]);

    delete (Object.prototype as any).a;
  });

  it("should work with string objects", () => {
    expect(keys(Object("abc")).sort()).toEqual(["0", "1", "2", "length"]);
  });

  it("should return keys for custom properties on string objects", () => {
    const object = Object("a");
    object.a = 1;

    expect(keys(object).sort()).toEqual(["0", "a", "length"]);
  });

  it("should not include inherited string keyed properties of string objects", () => {
    (String.prototype as any).a = 1;
    expect(keys(Object("a")).sort()).toEqual(["0", "length"]);
    delete (String.prototype as any).a;
  });

  it("should work with array-like objects", () => {
    expect(keys({ "0": "a", length: 1 }).sort()).toEqual(["0", "length"]);
  });

  it("should return an empty array when `object` is nullish", () => {
    expect(keys(null)).toEqual([]);
    expect(keys(undefined)).toEqual([]);
  });
});
