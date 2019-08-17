import { isDate, isMap, isNumber, isString } from "lodash-es";
import { pickBy } from "object";
import {
  isA,
  isDateOrString,
  isMapOrString,
  isNumberOrString,
  isStringOr2,
  keyIsA,
  keyIsAorC,
  keyIsAorNumber,
  keyIsC,
  keyIsNumber,
  keyIsString,
  keyIsString2,
  keyIsString3,
} from "../test-helpers/test-utils";

//
// Array
//

type A = Array<string | number>;
const a = [1, "b"] as A;
const aOrU = [1, "b"] as A | undefined;
const aOrN = [1, "b"] as A | null;

// $ExpectType { [index: number]: string | number; }
pickBy(a, () => true);
// $ExpectType { [index: number]: string | number; }
pickBy(aOrU, () => true);
// $ExpectType { [index: number]: string | number; }
pickBy(aOrN, () => true);

// narrowing

// $ExpectType { [index: number]: string; }
pickBy(a, isString);
// $ExpectType { [index: number]: string; }
pickBy(aOrU, isString);
// $ExpectType { [index: number]: string; }
pickBy(aOrN, isString);

// $ExpectType { [index: number]: string; }
pickBy(a, isDateOrString);
// $ExpectType { [index: number]: string; }
pickBy(aOrU, isDateOrString);
// $ExpectType { [index: number]: string; }
pickBy(aOrN, isDateOrString);

// $ExpectType { [index: number]: "a"; }
pickBy(a, isA);
// $ExpectType { [index: number]: "a"; }
pickBy(aOrU, isA);
// $ExpectType { [index: number]: "a"; }
pickBy(aOrN, isA);

type AB = Array<"a" | "b">;
const ab = ["a"] as AB;
const abOrU = ["a"] as AB | undefined;
const abOrN = ["a"] as AB | null;
// $ExpectType { [index: number]: "a"; }
pickBy(ab, isA);
// $ExpectType { [index: number]: "a"; }
pickBy(abOrU, isA);
// $ExpectType { [index: number]: "a"; }
pickBy(abOrN, isA);

type AN = Array<"a" | number>;
const an = ["a"] as AN;
const anOrU = ["a"] as AN | undefined;
const anOrN = ["a"] as AN | null;
// $ExpectType { [index: number]: 2 | "a"; }
pickBy(an, isStringOr2);
// $ExpectType { [index: number]: 2 | "a"; }
pickBy(anOrU, isStringOr2);
// $ExpectType { [index: number]: 2 | "a"; }
pickBy(anOrN, isStringOr2);

//
// Object
//

interface O {
  a: number;
  2: string;
  c: Date | Document;
}
const o = { a: 1, 2: "b", c: document } as O;
const oOrU = o as O | undefined;
const oOrN = o as O | null;
// $ExpectType Partial<O>
pickBy(o, () => true);
// $ExpectType Partial<O>
pickBy(oOrU, () => true);
// $ExpectType Partial<O>
pickBy(oOrN, () => true);

// value narrowing

// $ExpectType { 2: string; }
pickBy(o, isString);
// $ExpectType {} | { 2: string; }
pickBy(oOrU, isString);
// $ExpectType {} | { 2: string; }
pickBy(oOrN, isString);

// $ExpectType { c: Date | undefined; }
pickBy(o, isDate);
// $ExpectType {} | { c: Date | undefined; }
pickBy(oOrU, isDate);
// $ExpectType {} | { c: Date | undefined; }
pickBy(oOrN, isDate);

// $ExpectType { 2: string; a: number; }
pickBy(o, isNumberOrString);
// $ExpectType {} | { 2: string; a: number; }
pickBy(oOrU, isNumberOrString);
// $ExpectType {} | { 2: string; a: number; }
pickBy(oOrN, isNumberOrString);

// $ExpectType { 2: string; c: Date | undefined; }
pickBy(o, isDateOrString);
// $ExpectType {} | { 2: string; c: Date | undefined; }
pickBy(oOrU, isDateOrString);
// $ExpectType {} | { 2: string; c: Date | undefined; }
pickBy(oOrN, isDateOrString);

// $ExpectType {}
pickBy(o, isMap);
// $ExpectType {} | {}
pickBy(oOrU, isMap);
// $ExpectType {} | {}
pickBy(oOrN, isMap);

// $ExpectType { 2: string; }
pickBy(o, isMapOrString);
// $ExpectType {} | { 2: string; }
pickBy(oOrU, isMapOrString);
// $ExpectType {} | { 2: string; }
pickBy(oOrN, isMapOrString);

interface S2 {
  a: "a" | number;
}
const s2 = { a: 2 } as S2;
const s2OrU = { a: 2 } as S2 | undefined;
const s2OrN = { a: 2 } as S2 | null;
// $ExpectType { a: "a" | undefined; }
pickBy(s2, isA);
// $ExpectType {} | { a: "a" | undefined; }
pickBy(s2OrU, isA);
// $ExpectType {} | { a: "a" | undefined; }
pickBy(s2OrN, isA);
// $ExpectType { a: 2 | "a" | undefined; }
pickBy(s2, isStringOr2);
// $ExpectType {} | { a: 2 | "a" | undefined; }
pickBy(s2OrU, isStringOr2);
// $ExpectType {} | { a: 2 | "a" | undefined; }
pickBy(s2OrN, isStringOr2);

// key narrowing

interface S {
  a: number;
  b: string;
  c: Date | Document;
}
const s = { a: 1, b: "2", c: document } as S;
const sOrU = s as S | undefined;
const sOrN = s as S | null;

// $ExpectType { a: number; b: string; c: Date | Document; }
pickBy(s, keyIsString);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
pickBy(sOrU, keyIsString);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
pickBy(sOrN, keyIsString);
// $ExpectType { 2: string; a: number; c: Date | Document; }
pickBy(o, keyIsString);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
pickBy(oOrU, keyIsString);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
pickBy(oOrN, keyIsString);

// $ExpectType {}
pickBy(s, keyIsNumber);
// $ExpectType {} | {}
pickBy(sOrU, keyIsNumber);
// $ExpectType {} | {}
pickBy(sOrN, keyIsNumber);
// $ExpectType {}
pickBy(o, keyIsNumber);
// $ExpectType {} | {}
pickBy(oOrU, keyIsNumber);
// $ExpectType {} | {}
pickBy(oOrN, keyIsNumber);

// $ExpectType { a: number; }
pickBy(s, keyIsA);
// $ExpectType {} | { a: number; }
pickBy(sOrU, keyIsA);
// $ExpectType {} | { a: number; }
pickBy(sOrN, keyIsA);
// $ExpectType { 2: string | undefined; a: number; }
pickBy(o, keyIsA);
// $ExpectType {} | { 2: string | undefined; a: number; }
pickBy(oOrU, keyIsA);
// $ExpectType {} | { 2: string | undefined; a: number; }
pickBy(oOrN, keyIsA);

// $ExpectType {}
pickBy(s, keyIsString2);
// $ExpectType {} | {}
pickBy(sOrU, keyIsString2);
// $ExpectType {} | {}
pickBy(sOrN, keyIsString2);
// $ExpectType { 2: string | undefined; }
pickBy(o, keyIsString2);
// $ExpectType {} | { 2: string | undefined; }
pickBy(oOrU, keyIsString2);
// $ExpectType {} | { 2: string | undefined; }
pickBy(oOrN, keyIsString2);

// $ExpectType {}
pickBy(s, keyIsString3);
// $ExpectType {} | {}
pickBy(sOrU, keyIsString3);
// $ExpectType {} | {}
pickBy(sOrN, keyIsString3);
// $ExpectType { 2: string | undefined; }
pickBy(o, keyIsString3);
// $ExpectType {} | { 2: string | undefined; }
pickBy(oOrU, keyIsString3);
// $ExpectType {} | { 2: string | undefined; }
pickBy(oOrN, keyIsString3);

// $ExpectType { c: Date | Document; }
pickBy(s, keyIsC);
// $ExpectType {} | { c: Date | Document; }
pickBy(sOrU, keyIsC);
// $ExpectType {} | { c: Date | Document; }
pickBy(sOrN, keyIsC);
// $ExpectType { 2: string | undefined; c: Date | Document; }
pickBy(o, keyIsC);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
pickBy(oOrU, keyIsC);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
pickBy(oOrN, keyIsC);

// $ExpectType { a: number; c: Date | Document; }
pickBy(s, keyIsAorC);
// $ExpectType {} | { a: number; c: Date | Document; }
pickBy(sOrU, keyIsAorC);
// $ExpectType {} | { a: number; c: Date | Document; }
pickBy(sOrN, keyIsAorC);
// $ExpectType { 2: string | undefined; a: number; c: Date | Document; }
pickBy(o, keyIsAorC);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
pickBy(oOrU, keyIsAorC);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
pickBy(oOrN, keyIsAorC);

// $ExpectType { a: number; }
pickBy(s, keyIsAorNumber);
// $ExpectType {} | { a: number; }
pickBy(sOrU, keyIsAorNumber);
// $ExpectType {} | { a: number; }
pickBy(sOrN, keyIsAorNumber);
// $ExpectType { 2: string | undefined; a: number; }
pickBy(o, keyIsAorNumber);
// $ExpectType {} | { 2: string | undefined; a: number; }
pickBy(oOrU, keyIsAorNumber);
// $ExpectType {} | { 2: string | undefined; a: number; }
pickBy(oOrN, keyIsAorNumber);

const so = {} as { [key: string]: number | string };
// $ExpectType { [x: string]: string | undefined; }
pickBy(so, isString);
// $ExpectType { [x: string]: number | undefined; }
pickBy(so, isNumber);
// $ExpectType {}
pickBy(so, isDate);
// $ExpectType { [x: string]: string | undefined; }
pickBy(so, isDateOrString);
// $ExpectType { [x: string]: string | number; }
pickBy(so, keyIsString);
// $ExpectType { [x: string]: string | number | undefined; }
pickBy(so, keyIsA);
// $ExpectType {}
pickBy(so, keyIsNumber);
