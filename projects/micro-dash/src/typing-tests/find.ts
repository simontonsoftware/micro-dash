import { isMap, isNumber } from "lodash-es";
import { isDate, isString } from "util";
import { find } from "../lib/collection";
import {
  isA,
  isDateOrString,
  isMapOrString,
  isNumberOrString,
  isStringOr2,
  keyIs2,
  keyIs3,
  keyIsA,
  keyIsAorC,
  keyIsAorNumber,
  keyIsC,
  keyIsNumber,
  keyIsString,
} from "../test-helpers/test-utils";

//
// Array
//

type A = Array<string | number>;
const a = [1, "b"] as A;
const aOrU = a as A | undefined;
const aOrN = a as A | null;

// $ExpectType string | number | undefined
find(a, () => true);
// $ExpectType string | number | undefined
find(a, () => true, 1);
// $ExpectType string | number | undefined
find(aOrU, () => true);
// $ExpectType string | number | undefined
find(aOrU, () => true, 1);
// $ExpectType string | number | undefined
find(aOrN, () => true);
// $ExpectType string | number | undefined
find(aOrN, () => true, 1);

// Narrowing

// $ExpectType string | undefined
find(a, isString);
// $ExpectType string | undefined
find(a, isString, 1);
// $ExpectType string | undefined
find(aOrU, isString);
// $ExpectType string | undefined
find(aOrU, isString, 1);
// $ExpectType string | undefined
find(aOrN, isString);
// $ExpectType string | undefined
find(aOrN, isString, 1);

// $ExpectType string | undefined
find(a, isDateOrString);
// $ExpectType string | undefined
find(a, isDateOrString, 1);
// $ExpectType string | undefined
find(aOrU, isDateOrString);
// $ExpectType string | undefined
find(aOrU, isDateOrString, 1);
// $ExpectType string | undefined
find(aOrN, isDateOrString);
// $ExpectType string | undefined
find(aOrN, isDateOrString, 1);

// $ExpectType "a" | undefined
find(a, isA);
// $ExpectType "a" | undefined
find(aOrU, isA);
// $ExpectType "a" | undefined
find(aOrN, isA);

type AB = Array<"a" | "b">;
const ab = ["a"] as AB;
const abOrU = ["a"] as AB | undefined;
const abOrN = ["a"] as AB | null;
// $ExpectType "a" | undefined
find(ab, isA);
// $ExpectType "a" | undefined
find(abOrU, isA);
// $ExpectType "a" | undefined
find(abOrN, isA);
// $ExpectType "a" | "b" | undefined
find(ab, isString);
// $ExpectType "a" | "b" | undefined
find(abOrU, isString);
// $ExpectType "a" | "b" | undefined
find(abOrN, isString);

type AN = Array<"a" | number>;
const an = ["a"] as AN;
const anOrN = ["a"] as AN | null;
const anOrU = ["a"] as AN | undefined;
// $ExpectType "a" | 2 | undefined
find(an, isStringOr2);
// $ExpectType "a" | 2 | undefined
find(anOrU, isStringOr2);
// $ExpectType "a" | 2 | undefined
find(anOrN, isStringOr2);

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

// $ExpectType string | number | Date | Document | undefined
find(o, () => true);
// $ExpectType string | number | Date | Document | undefined
find(o, () => true, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, () => true);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, () => true, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, () => true);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, () => true, 1);

// Value narrowing

// $ExpectType string
find(o, isString);
// $ExpectType string | undefined
find(o, isString, 1);
// $ExpectType string | undefined
find(o, isString, 1 as number | undefined);
// $ExpectType string | undefined
find(oOrU, isString);
// $ExpectType string | undefined
find(oOrU, isString, 1);
// $ExpectType string | undefined
find(oOrN, isString);
// $ExpectType string | undefined
find(oOrN, isString, 1);

// $ExpectType Date | undefined
find(o, isDate);
// $ExpectType Date | undefined
find(o, isDate, 1);
// $ExpectType Date | undefined
find(oOrU, isDate);
// $ExpectType Date | undefined
find(oOrU, isDate, 1);
// $ExpectType Date | undefined
find(oOrN, isDate);
// $ExpectType Date | undefined
find(oOrN, isDate, 1);

// $ExpectType string | number
find(o, isNumberOrString);
// $ExpectType string | number | undefined
find(o, isNumberOrString, 1);
// $ExpectType string | number | undefined
find(oOrU, isNumberOrString);
// $ExpectType string | number | undefined
find(oOrU, isNumberOrString, 1);
// $ExpectType string | number | undefined
find(oOrN, isNumberOrString);
// $ExpectType string | number | undefined
find(oOrN, isNumberOrString, 1);

// $ExpectType string | Date | undefined
find(o, isDateOrString);
// $ExpectType string | Date | undefined
find(o, isDateOrString, 1);
// $ExpectType string | Date | undefined
find(oOrU, isDateOrString);
// $ExpectType string | Date | undefined
find(oOrU, isDateOrString, 1);
// $ExpectType string | Date | undefined
find(oOrN, isDateOrString);
// $ExpectType string | Date | undefined
find(oOrN, isDateOrString, 1);

// $ExpectType undefined
find(o, isMap);
// $ExpectType undefined
find(o, isMap, 1);
// $ExpectType undefined
find(oOrU, isMap);
// $ExpectType undefined
find(oOrU, isMap, 1);
// $ExpectType undefined
find(oOrN, isMap);
// $ExpectType undefined
find(oOrN, isMap, 1);

// $ExpectType string
find(o, isMapOrString);
// $ExpectType string | undefined
find(o, isMapOrString, 1);
// $ExpectType string | undefined
find(o, isMapOrString, 1 as number | undefined);
// $ExpectType string | undefined
find(oOrU, isMapOrString);
// $ExpectType string | undefined
find(oOrU, isMapOrString, 1);
// $ExpectType string | undefined
find(oOrN, isMapOrString);
// $ExpectType string | undefined
find(oOrN, isMapOrString, 1);

interface S2 {
  a: "a" | number;
}
const s2 = { a: 2 } as S2;
const s2OrU = { a: 2 } as S2 | undefined;
const s2OrN = { a: 2 } as S2 | null;
// $ExpectType "a" | undefined
find(s2, isA);
// $ExpectType "a" | undefined
find(s2, isA, 1);
// $ExpectType "a" | undefined
find(s2OrU, isA);
// $ExpectType "a" | undefined
find(s2OrU, isA, 1);
// $ExpectType "a" | undefined
find(s2OrN, isA);
// $ExpectType "a" | undefined
find(s2OrN, isA, 1);
// $ExpectType "a" | 2 | undefined
find(s2, isStringOr2);
// $ExpectType "a" | 2 | undefined
find(s2, isStringOr2, 1);
// $ExpectType "a" | 2 | undefined
find(s2OrU, isStringOr2);
// $ExpectType "a" | 2 | undefined
find(s2OrU, isStringOr2, 1);
// $ExpectType "a" | 2 | undefined
find(s2OrN, isStringOr2);
// $ExpectType "a" | 2 | undefined
find(s2OrN, isStringOr2, 1);

// Key narrowing

interface S {
  a: number;
  b: string;
  c: Date | Document;
}
const s = { a: 1, b: "2", c: document } as S;
const sOrU = s as S | undefined;
const sOrN = s as S | null;

// $ExpectType string | number | Date | Document
find(s, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(s, keyIsString, 1);
// $ExpectType string | number | Date | Document | undefined
find(sOrU, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(sOrU, keyIsString, 1);
// $ExpectType string | number | Date | Document | undefined
find(sOrN, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(sOrN, keyIsString, 1);
// $ExpectType string | number | Date | Document
find(o, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(o, keyIsString, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, keyIsString, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, keyIsString);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, keyIsString, 1);

// $ExpectType undefined
find(s, keyIsNumber);
// $ExpectType undefined
find(s, keyIsNumber, 1);
// $ExpectType undefined
find(sOrU, keyIsNumber);
// $ExpectType undefined
find(sOrU, keyIsNumber, 1);
// $ExpectType undefined
find(sOrN, keyIsNumber);
// $ExpectType undefined
find(sOrN, keyIsNumber, 1);
// $ExpectType undefined
find(o, keyIsNumber);
// $ExpectType undefined
find(o, keyIsNumber, 1);
// $ExpectType undefined
find(oOrU, keyIsNumber);
// $ExpectType undefined
find(oOrU, keyIsNumber, 1);
// $ExpectType undefined
find(oOrN, keyIsNumber);
// $ExpectType undefined
find(oOrN, keyIsNumber, 1);

// $ExpectType number
find(s, keyIsA);
// $ExpectType number | undefined
find(s, keyIsA, 1);
// $ExpectType number | undefined
find(sOrU, keyIsA);
// $ExpectType number | undefined
find(sOrU, keyIsA, 1);
// $ExpectType number | undefined
find(sOrN, keyIsA);
// $ExpectType number | undefined
find(sOrN, keyIsA, 1);
// $ExpectType string | number
find(o, keyIsA);
// $ExpectType string | number | undefined
find(o, keyIsA, 1);
// $ExpectType string | number | undefined
find(oOrU, keyIsA);
// $ExpectType string | number | undefined
find(oOrU, keyIsA, 1);
// $ExpectType string | number | undefined
find(oOrN, keyIsA);
// $ExpectType string | number | undefined
find(oOrN, keyIsA, 1);

// $ExpectType undefined
find(s, keyIs2);
// $ExpectType undefined
find(s, keyIs2, 1);
// $ExpectType undefined
find(sOrU, keyIs2);
// $ExpectType undefined
find(sOrU, keyIs2, 1);
// $ExpectType undefined
find(sOrN, keyIs2);
// $ExpectType undefined
find(sOrN, keyIs2, 1);
// $ExpectType string
find(o, keyIs2);
// $ExpectType string | undefined
find(o, keyIs2, 1);
// $ExpectType string | undefined
find(oOrU, keyIs2);
// $ExpectType string | undefined
find(oOrU, keyIs2, 1);
// $ExpectType string | undefined
find(oOrN, keyIs2);
// $ExpectType string | undefined
find(oOrN, keyIs2, 1);

// $ExpectType undefined
find(s, keyIs3);
// $ExpectType undefined
find(s, keyIs3, 1);
// $ExpectType undefined
find(sOrU, keyIs3);
// $ExpectType undefined
find(sOrU, keyIs3, 1);
// $ExpectType undefined
find(sOrN, keyIs3);
// $ExpectType undefined
find(sOrN, keyIs3, 1);
// $ExpectType string
find(o, keyIs3);
// $ExpectType string | undefined
find(o, keyIs3, 1);
// $ExpectType string | undefined
find(oOrU, keyIs3);
// $ExpectType string | undefined
find(oOrU, keyIs3, 1);
// $ExpectType string | undefined
find(oOrN, keyIs3);
// $ExpectType string | undefined
find(oOrN, keyIs3, 1);

// $ExpectType Date | Document
find(s, keyIsC);
// $ExpectType Date | Document | undefined
find(s, keyIsC, 1);
// $ExpectType Date | Document | undefined
find(sOrU, keyIsC);
// $ExpectType Date | Document | undefined
find(sOrU, keyIsC, 1);
// $ExpectType Date | Document | undefined
find(sOrN, keyIsC);
// $ExpectType Date | Document | undefined
find(sOrN, keyIsC, 1);
// $ExpectType string | Date | Document
find(o, keyIsC);
// $ExpectType string | Date | Document | undefined
find(o, keyIsC, 1);
// $ExpectType string | Date | Document | undefined
find(oOrU, keyIsC);
// $ExpectType string | Date | Document | undefined
find(oOrU, keyIsC, 1);
// $ExpectType string | Date | Document | undefined
find(oOrN, keyIsC);
// $ExpectType string | Date | Document | undefined
find(oOrN, keyIsC, 1);

// $ExpectType number | Date | Document
find(s, keyIsAorC);
// $ExpectType number | Date | Document | undefined
find(s, keyIsAorC, 1);
// $ExpectType number | Date | Document | undefined
find(sOrU, keyIsAorC);
// $ExpectType number | Date | Document | undefined
find(sOrU, keyIsAorC, 1);
// $ExpectType number | Date | Document | undefined
find(sOrN, keyIsAorC);
// $ExpectType number | Date | Document | undefined
find(sOrN, keyIsAorC, 1);
// $ExpectType string | number | Date | Document
find(o, keyIsAorC);
// $ExpectType string | number | Date | Document | undefined
find(o, keyIsAorC, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, keyIsAorC);
// $ExpectType string | number | Date | Document | undefined
find(oOrU, keyIsAorC, 1);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, keyIsAorC);
// $ExpectType string | number | Date | Document | undefined
find(oOrN, keyIsAorC, 1);

// $ExpectType number
find(s, keyIsAorNumber);
// $ExpectType number | undefined
find(s, keyIsAorNumber, 1);
// $ExpectType number | undefined
find(sOrU, keyIsAorNumber);
// $ExpectType number | undefined
find(sOrU, keyIsAorNumber, 1);
// $ExpectType number | undefined
find(sOrN, keyIsAorNumber);
// $ExpectType number | undefined
find(sOrN, keyIsAorNumber, 1);
// $ExpectType string | number
find(o, keyIsAorNumber);
// $ExpectType string | number | undefined
find(o, keyIsAorNumber, 1);
// $ExpectType string | number | undefined
find(oOrU, keyIsAorNumber);
// $ExpectType string | number | undefined
find(oOrU, keyIsAorNumber, 1);
// $ExpectType string | number | undefined
find(oOrN, keyIsAorNumber);
// $ExpectType string | number | undefined
find(oOrN, keyIsAorNumber, 1);

const so = {} as { [key: string]: number | string };
// $ExpectType string | undefined
find(so, isString);
// $ExpectType number | undefined
find(so, isNumber);
// $ExpectType undefined
find(so, isDate);
// $ExpectType string | undefined
find(so, isDateOrString);
// $ExpectType string | number | undefined
find(so, keyIsString);
// $ExpectType string | number | undefined
find(so, keyIsA);
// $ExpectType undefined
find(so, keyIsNumber);
