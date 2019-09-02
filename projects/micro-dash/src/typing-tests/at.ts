// import { at } from "../lib/object";
//
// type A = string[];
// const a = ["a"] as A;
// const aOrU = a as A | undefined;
// const aOrN = a as A | null;
//
// interface O {
//   a: string;
//   b: number;
//   c: Date;
// }
// const o = {} as O;
//
// //
// // unwrapped keys
// //
//
// // $ExpectType []
// at(a);
// // $ExpectType [string]
// at(a, 1);
// // $ExpectType [string, string]
// at(a, 1, 2);
// // $ExpectType [string, string, string]
// at(a, 1, 2, 1);
// // $ExpectType [string, string, string, string]
// at(a, 1, 2, 1, 4);
//
// // $ExpectType []
// at(aOrU);
// // $ExpectType [undefined] | [string]
// at(aOrU, 1);
// // $ExpectType [undefined, undefined] | [string, string]
// at(aOrU, 1, 2);
// // $ExpectType [undefined, undefined, undefined] | [string, string, string]
// at(aOrU, 1, 2, 1);
// // $ExpectType [undefined, undefined, undefined, undefined] | [string, string, string, string]
// at(aOrU, 1, 2, 1, 4);
//
// // $ExpectType []
// at(aOrN);
// // $ExpectType [undefined] | [string]
// at(aOrN, 1);
// // $ExpectType [undefined, undefined] | [string, string]
// at(aOrN, 1, 2);
// // $ExpectType [undefined, undefined, undefined] | [string, string, string]
// at(aOrN, 1, 2, 1);
// // $ExpectType [undefined, undefined, undefined, undefined] | [string, string, string, string]
// at(aOrN, 1, 2, 1, 4);
//
// // $ExpectType []
// at(o);
// // $ExpectType [string, number]
// at(o, "a", "b");
// // $ExpectType [string, number, Date, string, ...(string | number | Date)[]]
// at(o, "a", "b", "c", "a", "b");
//
// //
// // Wrapped keys
// //
//
// // $ExpectType [string]
// at(a, [1]);
// // $ExpectType [string, number]
// at(o, ["a", "b"]);
// // $ExpectType [string, string, string]
// at(a, [1, 2, 1]);
// // $ExpectType [string, string, string, string]
// at(a, [1, 2, 1, 4]);
// // $ExpectType [string, number, Date, string, ...(string | number | Date)[]]
// at(o, ["a", "b", "c", "a", "b"]);
//
// // interface D {
// //   a: string;
// //   b: {
// //     c: number;
// //     d: {
// //       e: {
// //         f: {
// //           g: Date;
// //           h: number;
// //         };
// //         i: number;
// //       };
// //     };
// //   };
// //   j: number;
// // }
// // const d = {} as D;
