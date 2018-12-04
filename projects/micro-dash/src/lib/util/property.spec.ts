// There's no good way to make this type safe.

// import { property } from "./property";
//
// describe("property()", () => {
//   //
//   // stolen from https://github.com/lodash/lodash
//   //
//
//   it("should create a function that plucks a property value of a given object", () => {
//     const object = { a: 1 };
//     const prop = property<typeof object>(["a"]);
//     expect(prop.length).toBe(1);
//     expect(prop(object)).toBe(1);
//   });
//
//   it("should pluck deep property values", () => {
//     expect(property(["a", "b"])({ a: { b: 2 } })).toBe(2);
//   });
//
//   it("should work with a non-string `path`", () => {
//     expect(property([1])([1, 2, 3])).toBe(2);
//   });
//
//   // it("should preserve the sign of `0`", () => {
//   //   const object = { "-0": "a", "0": "b" },
//   //     props = [-0, Object(-0), 0, Object(0)];
//   //
//   //   const actual = lodashStable.map(props, function(key) {
//   //     const prop = _.property(key);
//   //     return prop(object);
//   //   });
//   //
//   //   assert.deepEqual(actual, ["a", "a", "b", "b"]);
//   // });
//   //
//   // it("should coerce `path` to a string", () => {
//   //   function fn() {}
//   //   fn.toString = lodashStable.constant("fn");
//   //
//   //   const expected = [1, 2, 3, 4],
//   //     object = { null: 1, undefined: 2, fn: 3, "[object Object]": 4 },
//   //     paths = [null, undefined, fn, {}];
//   //
//   //   lodashStable.times(2, function(index) {
//   //     const actual = lodashStable.map(paths, function(path) {
//   //       const prop = _.property(index ? [path] : path);
//   //       return prop(object);
//   //     });
//   //
//   //     assert.deepEqual(actual, expected);
//   //   });
//   // });
//   //
//   // it("should pluck a key over a path", () => {
//   //   const object = { "a.b": 1, a: { b: 2 } };
//   //
//   //   lodashStable.each(["a.b", ["a.b"]], function(path) {
//   //     const prop = _.property(path);
//   //     assert.strictEqual(prop(object), 1);
//   //   });
//   // });
//   //
//   // it("should return `undefined` when `object` is nullish", function(
//   //   assert,
//   // ) {
//   //   const values = [, null, undefined],
//   //     expected = lodashStable.map(values, noop);
//   //
//   //   lodashStable.each(["constructor", ["constructor"]], function(path) {
//   //     const prop = _.property(path);
//   //
//   //     const actual = lodashStable.map(values, function(value, index) {
//   //       return index ? prop(value) : prop();
//   //     });
//   //
//   //     assert.deepEqual(actual, expected);
//   //   });
//   // });
//   //
//   // it(
//   //   "should return `undefined` for deep paths when `object` is nullish",
//   //   () => {
//   //     const values = [, null, undefined],
//   //       expected = lodashStable.map(values, noop);
//   //
//   //     lodashStable.each(
//   //       [
//   //         "constructor.prototype.valueOf",
//   //         ["constructor", "prototype", "valueOf"],
//   //       ],
//   //       function(path) {
//   //         const prop = _.property(path);
//   //
//   //         const actual = lodashStable.map(values, function(value, index) {
//   //           return index ? prop(value) : prop();
//   //         });
//   //
//   //         assert.deepEqual(actual, expected);
//   //       },
//   //     );
//   //   },
//   // );
//   //
//   // it(
//   //   "should return `undefined` if parts of `path` are missing",
//   //   () => {
//   //     const object = {};
//   //
//   //     lodashStable.each(
//   //       ["a", "a[1].b.c", ["a"], ["a", "1", "b", "c"]],
//   //       function(path) {
//   //         const prop = _.property(path);
//   //         assert.strictEqual(prop(object), undefined);
//   //       },
//   //     );
//   //   },
//   // );
// });
