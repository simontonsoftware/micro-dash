import { isDate, isMap, isNumber, isString } from 'lodash-es';
import { findKey } from '../lib/object';
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
} from '../test-helpers/test-utils';

//
// Array
//
type A = Array<string | number>;
const a = [1, 'b'] as A;
const aOrU = a as A | undefined;
const aOrN = a as A | null;

// $ExpectType string | undefined
findKey(a, () => true);
// $ExpectType string | undefined
findKey(aOrU, () => true);
// $ExpectType string | undefined
findKey(aOrN, () => true);

//
// Object
//

interface O {
  a: number;
  2: string;
  c: Date | Document;
}
const o = { a: 1, 2: 'b', c: document } as O;
const oOrU = o as O | undefined;
const oOrN = o as O | null;

interface S {
  a: number;
  b: string;
  c: Date | Document;
}
const s = { a: 1, b: '2', c: document } as S;
const sOrU = s as S | undefined;
const sOrN = s as S | null;

// $ExpectType string | undefined
findKey(o, () => true);
// $ExpectType string | undefined
findKey(oOrU, () => true);
// $ExpectType string | undefined
findKey(oOrN, () => true);

// $ExpectType "a" | "b" | "c" | undefined
findKey(s, () => true);
// $ExpectType "a" | "b" | "c" | undefined
findKey(sOrU, () => true);
// $ExpectType "a" | "b" | "c" | undefined
findKey(sOrN, () => true);

// Value narrowing

// $ExpectType string
findKey(o, isString);
// $ExpectType string | undefined
findKey(oOrU, isString);
// $ExpectType string | undefined
findKey(oOrN, isString);

// $ExpectType "c" | undefined
findKey(o, isDate);
// $ExpectType "c" | undefined
findKey(oOrU, isDate);
// $ExpectType "c" | undefined
findKey(oOrN, isDate);

// $ExpectType string
findKey(o, isNumberOrString);
// $ExpectType string | undefined
findKey(oOrU, isNumberOrString);
// $ExpectType string | undefined
findKey(oOrN, isNumberOrString);
// $ExpectType "a" | "b"
findKey(s, isNumberOrString);
// $ExpectType "a" | "b" | undefined
findKey(sOrU, isNumberOrString);
// $ExpectType "a" | "b" | undefined
findKey(sOrN, isNumberOrString);

// $ExpectType "b" | "c"
findKey(s, isDateOrString);
// $ExpectType "b" | "c" | undefined
findKey(sOrU, isDateOrString);
// $ExpectType "b" | "c" | undefined
findKey(sOrN, isDateOrString);

// $ExpectType undefined
findKey(o, isMap);
// $ExpectType undefined
findKey(oOrU, isMap);
// $ExpectType undefined
findKey(oOrN, isMap);

// $ExpectType string
findKey(o, isMapOrString);
// $ExpectType string | undefined
findKey(oOrU, isMapOrString);
// $ExpectType string | undefined
findKey(oOrN, isMapOrString);
// $ExpectType "b"
findKey(s, isMapOrString);
// $ExpectType "b" | undefined
findKey(sOrU, isMapOrString);
// $ExpectType "b" | undefined
findKey(sOrN, isMapOrString);

interface S2 {
  b: 'a' | number;
}
const s2 = { b: 2 } as S2;
const s2OrU = s2 as S2 | undefined;
const s2OrN = s2 as S2 | null;
// $ExpectType "b" | undefined
findKey(s2, isA);
// $ExpectType "b" | undefined
findKey(s2OrU, isA);
// $ExpectType "b" | undefined
findKey(s2OrN, isA);
// $ExpectType "b" | undefined
findKey(s2, isStringOr2);
// $ExpectType "b" | undefined
findKey(s2OrU, isStringOr2);
// $ExpectType "b" | undefined
findKey(s2OrN, isStringOr2);

// Key narrowing

// $ExpectType "a" | "b" | "c"
findKey(s, keyIsString);
// $ExpectType "a" | "b" | "c" | undefined
findKey(sOrU, keyIsString);
// $ExpectType "a" | "b" | "c" | undefined
findKey(sOrN, keyIsString);
// $ExpectType string
findKey(o, keyIsString);
// $ExpectType string | undefined
findKey(oOrU, keyIsString);
// $ExpectType string | undefined
findKey(oOrN, keyIsString);

// $ExpectType undefined
findKey(s, keyIsNumber);
// $ExpectType undefined
findKey(sOrU, keyIsNumber);
// $ExpectType undefined
findKey(sOrN, keyIsNumber);
// $ExpectType undefined
findKey(o, keyIsNumber);
// $ExpectType undefined
findKey(oOrU, keyIsNumber);
// $ExpectType undefined
findKey(oOrN, keyIsNumber);

// $ExpectType "a"
findKey(s, keyIsA);
// $ExpectType "a" | undefined
findKey(sOrU, keyIsA);
// $ExpectType "a" | undefined
findKey(sOrN, keyIsA);
// $ExpectType "a"
findKey(o, keyIsA);
// $ExpectType "a" | undefined
findKey(oOrU, keyIsA);
// $ExpectType "a" | undefined
findKey(oOrN, keyIsA);

// $ExpectType undefined
findKey(s, keyIsString2);
// $ExpectType undefined
findKey(sOrU, keyIsString2);
// $ExpectType undefined
findKey(sOrN, keyIsString2);
// $ExpectType "2" | undefined
findKey(o, keyIsString2);
// $ExpectType "2" | undefined
findKey(oOrU, keyIsString2);
// $ExpectType "2" | undefined
findKey(oOrN, keyIsString2);

// $ExpectType undefined
findKey(s, keyIsString3);
// $ExpectType undefined
findKey(sOrU, keyIsString3);
// $ExpectType undefined
findKey(sOrN, keyIsString3);
// $ExpectType "3" | undefined
findKey(o, keyIsString3);
// $ExpectType "3" | undefined
findKey(oOrU, keyIsString3);
// $ExpectType "3" | undefined
findKey(oOrN, keyIsString3);

// $ExpectType "c"
findKey(s, keyIsC);
// $ExpectType "c" | undefined
findKey(sOrU, keyIsC);
// $ExpectType "c" | undefined
findKey(sOrN, keyIsC);
// $ExpectType "c"
findKey(o, keyIsC);
// $ExpectType "c" | undefined
findKey(oOrU, keyIsC);
// $ExpectType "c" | undefined
findKey(oOrN, keyIsC);

// $ExpectType "a" | "c"
findKey(s, keyIsAorC);
// $ExpectType "a" | "c" | undefined
findKey(sOrU, keyIsAorC);
// $ExpectType "a" | "c" | undefined
findKey(sOrN, keyIsAorC);
// $ExpectType "a" | "c"
findKey(o, keyIsAorC);
// $ExpectType "a" | "c" | undefined
findKey(oOrU, keyIsAorC);
// $ExpectType "a" | "c" | undefined
findKey(oOrN, keyIsAorC);

// $ExpectType "a"
findKey(s, keyIsAorNumber);
// $ExpectType "a" | undefined
findKey(sOrU, keyIsAorNumber);
// $ExpectType "a" | undefined
findKey(sOrN, keyIsAorNumber);
// $ExpectType "a"
findKey(o, keyIsAorNumber);
// $ExpectType "a" | undefined
findKey(oOrU, keyIsAorNumber);
// $ExpectType "a" | undefined
findKey(oOrN, keyIsAorNumber);

const so = {} as { [key: string]: number | string };
// $ExpectType string | undefined
findKey(so, isString);
// $ExpectType string | undefined
findKey(so, isNumber);
// $ExpectType undefined
findKey(so, isDate);
// $ExpectType string | undefined
findKey(so, isDateOrString);
// $ExpectType string
findKey(so, keyIsString);
// $ExpectType "a" | undefined
findKey(so, keyIsA);
// $ExpectType undefined
findKey(so, keyIsNumber);
