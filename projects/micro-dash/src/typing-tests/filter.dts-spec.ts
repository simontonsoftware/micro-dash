import { filter } from "collection";
import { isDate, isMap, isNumber, isString } from "lodash-es";
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
const aOrU = a as A | undefined;
const aOrN = a as A | null;

// $ExpectType (string | number)[]
filter(a, () => true);
// $ExpectType (string | number)[]
filter(aOrU, () => true);
// $ExpectType (string | number)[]
filter(aOrN, () => true);

// Narrowing

// $ExpectType string[]
filter(a, isString);
// $ExpectType string[]
filter(aOrU, isString);
// $ExpectType string[]
filter(aOrN, isString);

// $ExpectType string[]
filter(a, isDateOrString);
// $ExpectType string[]
filter(aOrU, isDateOrString);
// $ExpectType string[]
filter(aOrN, isDateOrString);

// $ExpectType "a"[]
filter(a, isA);
// $ExpectType "a"[]
filter(aOrU, isA);
// $ExpectType "a"[]
filter(aOrN, isA);

type AB = Array<"a" | "b">;
const ab = ["a"] as AB;
const abOrU = ["a"] as AB | undefined;
const abOrN = ["a"] as AB | null;
// $ExpectType "a"[]
filter(ab, isA);
// $ExpectType "a"[]
filter(abOrU, isA);
// $ExpectType "a"[]
filter(abOrN, isA);

type AN = Array<"a" | number>;
const an = ["a"] as AN;
const anOrU = ["a"] as AN | undefined;
const anOrN = ["a"] as AN | null;
// $ExpectType ("a" | 2)[]
filter(an, isStringOr2);
// $ExpectType ("a" | 2)[]
filter(anOrU, isStringOr2);
// $ExpectType ("a" | 2)[]
filter(anOrN, isStringOr2);

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

// $ExpectType (string | number | Date | Document)[]
filter(o, () => true);
// $ExpectType (string | number | Date | Document)[]
filter(oOrU, () => true);
// $ExpectType (string | number | Date | Document)[]
filter(oOrN, () => true);

// Value narrowing

// $ExpectType string[]
filter(o, isString);
// $ExpectType string[]
filter(oOrU, isString);
// $ExpectType string[]
filter(oOrN, isString);

// $ExpectType Date[]
filter(o, isDate);
// $ExpectType Date[]
filter(oOrU, isDate);
// $ExpectType Date[]
filter(oOrN, isDate);

// $ExpectType (string | number)[]
filter(o, isNumberOrString);
// $ExpectType (string | number)[]
filter(oOrU, isNumberOrString);
// $ExpectType (string | number)[]
filter(oOrN, isNumberOrString);

// $ExpectType (string | Date)[]
filter(o, isDateOrString);
// $ExpectType (string | Date)[]
filter(oOrU, isDateOrString);
// $ExpectType (string | Date)[]
filter(oOrN, isDateOrString);

// $ExpectType never[]
filter(o, isMap);
// $ExpectType never[]
filter(oOrU, isMap);
// $ExpectType never[]
filter(oOrN, isMap);

// $ExpectType string[]
filter(o, isMapOrString);
// $ExpectType string[]
filter(oOrU, isMapOrString);
// $ExpectType string[]
filter(oOrN, isMapOrString);

interface S2 {
  a: "a" | number;
}
const s2 = { a: 2 } as S2;
const s2OrU = { a: 2 } as S2 | undefined;
const s2OrN = { a: 2 } as S2 | null;
// $ExpectType "a"[]
filter(s2, isA);
// $ExpectType "a"[]
filter(s2OrU, isA);
// $ExpectType "a"[]
filter(s2OrN, isA);
// $ExpectType ("a" | 2)[]
filter(s2, isStringOr2);
// $ExpectType ("a" | 2)[]
filter(s2OrU, isStringOr2);
// $ExpectType ("a" | 2)[]
filter(s2OrN, isStringOr2);

// Key narrowing

interface S {
  a: number;
  b: string;
  c: Date | Document;
}
const s = { a: 1, b: "2", c: document } as S;
const sOrU = s as S | undefined;
const sOrN = s as S | null;

// $ExpectType (string | number | Date | Document)[]
filter(s, keyIsString);
// $ExpectType (string | number | Date | Document)[]
filter(sOrU, keyIsString);
// $ExpectType (string | number | Date | Document)[]
filter(sOrN, keyIsString);
// $ExpectType (string | number | Date | Document)[]
filter(o, keyIsString);
// $ExpectType (string | number | Date | Document)[]
filter(oOrU, keyIsString);
// $ExpectType (string | number | Date | Document)[]
filter(oOrN, keyIsString);

// $ExpectType never[]
filter(s, keyIsNumber);
// $ExpectType never[]
filter(sOrU, keyIsNumber);
// $ExpectType never[]
filter(sOrN, keyIsNumber);
// $ExpectType never[]
filter(o, keyIsNumber);
// $ExpectType never[]
filter(oOrU, keyIsNumber);
// $ExpectType never[]
filter(oOrN, keyIsNumber);

// $ExpectType number[]
filter(s, keyIsA);
// $ExpectType number[]
filter(sOrU, keyIsA);
// $ExpectType number[]
filter(sOrN, keyIsA);
// $ExpectType (string | number)[]
filter(o, keyIsA);
// $ExpectType (string | number)[]
filter(oOrU, keyIsA);
// $ExpectType (string | number)[]
filter(oOrN, keyIsA);

// $ExpectType never[]
filter(s, keyIsString2);
// $ExpectType never[]
filter(sOrU, keyIsString2);
// $ExpectType never[]
filter(sOrN, keyIsString2);
// $ExpectType string[]
filter(o, keyIsString2);
// $ExpectType string[]
filter(oOrU, keyIsString2);
// $ExpectType string[]
filter(oOrN, keyIsString2);

// $ExpectType never[]
filter(s, keyIsString3);
// $ExpectType never[]
filter(sOrU, keyIsString3);
// $ExpectType never[]
filter(sOrN, keyIsString3);
// $ExpectType string[]
filter(o, keyIsString3);
// $ExpectType string[]
filter(oOrU, keyIsString3);
// $ExpectType string[]
filter(oOrN, keyIsString3);

// $ExpectType (Date | Document)[]
filter(s, keyIsC);
// $ExpectType (Date | Document)[]
filter(sOrU, keyIsC);
// $ExpectType (Date | Document)[]
filter(sOrN, keyIsC);
// $ExpectType (string | Date | Document)[]
filter(o, keyIsC);
// $ExpectType (string | Date | Document)[]
filter(oOrU, keyIsC);
// $ExpectType (string | Date | Document)[]
filter(oOrN, keyIsC);

// $ExpectType (number | Date | Document)[]
filter(s, keyIsAorC);
// $ExpectType (number | Date | Document)[]
filter(sOrU, keyIsAorC);
// $ExpectType (number | Date | Document)[]
filter(sOrN, keyIsAorC);
// $ExpectType (string | number | Date | Document)[]
filter(o, keyIsAorC);
// $ExpectType (string | number | Date | Document)[]
filter(oOrU, keyIsAorC);
// $ExpectType (string | number | Date | Document)[]
filter(oOrN, keyIsAorC);

// $ExpectType number[]
filter(s, keyIsAorNumber);
// $ExpectType number[]
filter(sOrU, keyIsAorNumber);
// $ExpectType number[]
filter(sOrN, keyIsAorNumber);
// $ExpectType (string | number)[]
filter(o, keyIsAorNumber);
// $ExpectType (string | number)[]
filter(oOrU, keyIsAorNumber);
// $ExpectType (string | number)[]
filter(oOrN, keyIsAorNumber);

const so = {} as { [key: string]: number | string };
// $ExpectType string[]
filter(so, isString);
// $ExpectType number[]
filter(so, isNumber);
// $ExpectType never[]
filter(so, isDate);
// $ExpectType string[]
filter(so, isDateOrString);
// $ExpectType (string | number)[]
filter(so, keyIsString);
// $ExpectType (string | number)[]
filter(so, keyIsA);
// $ExpectType never[]
filter(so, keyIsNumber);
