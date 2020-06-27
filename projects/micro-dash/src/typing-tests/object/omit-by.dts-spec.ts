import { isDate, isMap, isNumber, isString } from 'lodash-es';
import { omitBy } from '../../public-api';
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
} from '../../test-helpers/test-utils';

//
// Array
//

type A = Array<string | number>;
const a = [1, 'b'] as A;
const aOrU = [1, 'b'] as A | undefined;
const aOrN = [1, 'b'] as A | null;

// $ExpectType { [index: number]: string | number; }
omitBy(a, () => true);
// $ExpectType { [index: number]: string | number; }
omitBy(aOrU, () => true);
// $ExpectType { [index: number]: string | number; }
omitBy(aOrN, () => true);

// narrowing

// $ExpectType { [index: number]: number; }
omitBy(a, isString);
// $ExpectType { [index: number]: number; }
omitBy(aOrU, isString);
// $ExpectType { [index: number]: number; }
omitBy(aOrN, isString);

// $ExpectType { [index: number]: number; }
omitBy(a, isDateOrString);
// $ExpectType { [index: number]: number; }
omitBy(aOrU, isDateOrString);
// $ExpectType { [index: number]: number; }
omitBy(aOrN, isDateOrString);

// $ExpectType { [index: number]: string | number; }
omitBy(a, isA);
// $ExpectType { [index: number]: string | number; }
omitBy(aOrU, isA);
// $ExpectType { [index: number]: string | number; }
omitBy(aOrN, isA);

type AB = Array<'a' | 'b'>;
const ab = ['a'] as AB;
const abOrU = ['a'] as AB | undefined;
const abOrN = ['a'] as AB | null;
// $ExpectType { [index: number]: "b"; }
omitBy(ab, isA);
// $ExpectType { [index: number]: "b"; }
omitBy(abOrU, isA);
// $ExpectType { [index: number]: "b"; }
omitBy(abOrN, isA);

type AN = Array<'a' | number>;
const an = ['a'] as AN;
const anOrU = ['a'] as AN | undefined;
const anOrN = ['a'] as AN | null;
// $ExpectType { [index: number]: number; }
omitBy(an, isStringOr2);
// $ExpectType { [index: number]: number; }
omitBy(anOrU, isStringOr2);
// $ExpectType { [index: number]: number; }
omitBy(anOrN, isStringOr2);

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
// $ExpectType Partial<O>
omitBy(o, () => true);
// $ExpectType Partial<O>
omitBy(oOrU, () => true);
// $ExpectType Partial<O>
omitBy(oOrN, () => true);

// value narrowing

// $ExpectType { a: number; c: Date | Document; }
omitBy(o, isString);
// $ExpectType {} | { a: number; c: Date | Document; }
omitBy(oOrU, isString);
// $ExpectType {} | { a: number; c: Date | Document; }
omitBy(oOrN, isString);

// $ExpectType { 2: string; a: number; c: Document | undefined; }
omitBy(o, isDate);
// $ExpectType {} | { 2: string; a: number; c: Document | undefined; }
omitBy(oOrU, isDate);
// $ExpectType {} | { 2: string; a: number; c: Document | undefined; }
omitBy(oOrN, isDate);

// $ExpectType { c: Date | Document; }
omitBy(o, isNumberOrString);
// $ExpectType {} | { c: Date | Document; }
omitBy(oOrU, isNumberOrString);
// $ExpectType {} | { c: Date | Document; }
omitBy(oOrN, isNumberOrString);

// $ExpectType { a: number; c: Document | undefined; }
omitBy(o, isDateOrString);
// $ExpectType {} | { a: number; c: Document | undefined; }
omitBy(oOrU, isDateOrString);
// $ExpectType {} | { a: number; c: Document | undefined; }
omitBy(oOrN, isDateOrString);

// $ExpectType { 2: string; a: number; c: Date | Document; }
omitBy(o, isMap);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
omitBy(oOrU, isMap);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
omitBy(oOrN, isMap);

// $ExpectType { a: number; c: Date | Document; }
omitBy(o, isMapOrString);
// $ExpectType {} | { a: number; c: Date | Document; }
omitBy(oOrU, isMapOrString);
// $ExpectType {} | { a: number; c: Date | Document; }
omitBy(oOrN, isMapOrString);

interface S2 {
  a: 'a' | number;
}
const s2 = { a: 2 } as S2;
const s2OrU = { a: 2 } as S2 | undefined;
const s2OrN = { a: 2 } as S2 | null;
// $ExpectType { a: number | undefined; }
omitBy(s2, isA);
// $ExpectType {} | { a: number | undefined; }
omitBy(s2OrU, isA);
// $ExpectType {} | { a: number | undefined; }
omitBy(s2OrN, isA);
// $ExpectType { a: number | undefined; }
omitBy(s2, isStringOr2);
// $ExpectType {} | { a: number | undefined; }
omitBy(s2OrU, isStringOr2);
// $ExpectType {} | { a: number | undefined; }
omitBy(s2OrN, isStringOr2);

// key narrowing

interface S {
  a: number;
  b: string;
  c: Date | Document;
}
const s = { a: 1, b: '2', c: document } as S;
const sOrU = s as S | undefined;
const sOrN = s as S | null;

// $ExpectType {}
omitBy(s, keyIsString);
// $ExpectType {} | {}
omitBy(sOrU, keyIsString);
// $ExpectType {} | {}
omitBy(sOrN, keyIsString);
// $ExpectType {}
omitBy(o, keyIsString);
// $ExpectType {} | {}
omitBy(oOrU, keyIsString);
// $ExpectType {} | {}
omitBy(oOrN, keyIsString);

// $ExpectType { a: number; b: string; c: Date | Document; }
omitBy(s, keyIsNumber);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrU, keyIsNumber);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrN, keyIsNumber);
// $ExpectType { 2: string; a: number; c: Date | Document; }
omitBy(o, keyIsNumber);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
omitBy(oOrU, keyIsNumber);
// $ExpectType {} | { 2: string; a: number; c: Date | Document; }
omitBy(oOrN, keyIsNumber);

// $ExpectType { b: string; c: Date | Document; }
omitBy(s, keyIsA);
// $ExpectType {} | { b: string; c: Date | Document; }
omitBy(sOrU, keyIsA);
// $ExpectType {} | { b: string; c: Date | Document; }
omitBy(sOrN, keyIsA);
// $ExpectType { 2: string | undefined; c: Date | Document; }
omitBy(o, keyIsA);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
omitBy(oOrU, keyIsA);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
omitBy(oOrN, keyIsA);

// $ExpectType { a: number; b: string; c: Date | Document; }
omitBy(s, keyIsString2);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrU, keyIsString2);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrN, keyIsString2);
// $ExpectType { 2: string | undefined; a: number; c: Date | Document; }
omitBy(o, keyIsString2);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
omitBy(oOrU, keyIsString2);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
omitBy(oOrN, keyIsString2);

// $ExpectType { a: number; b: string; c: Date | Document; }
omitBy(s, keyIsString3);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrU, keyIsString3);
// $ExpectType {} | { a: number; b: string; c: Date | Document; }
omitBy(sOrN, keyIsString3);
// $ExpectType { 2: string | undefined; a: number; c: Date | Document; }
omitBy(o, keyIsString3);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
omitBy(oOrU, keyIsString3);
// $ExpectType {} | { 2: string | undefined; a: number; c: Date | Document; }
omitBy(oOrN, keyIsString3);

// $ExpectType { a: number; b: string; }
omitBy(s, keyIsC);
// $ExpectType {} | { a: number; b: string; }
omitBy(sOrU, keyIsC);
// $ExpectType {} | { a: number; b: string; }
omitBy(sOrN, keyIsC);
// $ExpectType { 2: string | undefined; a: number; }
omitBy(o, keyIsC);
// $ExpectType {} | { 2: string | undefined; a: number; }
omitBy(oOrU, keyIsC);
// $ExpectType {} | { 2: string | undefined; a: number; }
omitBy(oOrN, keyIsC);

// $ExpectType { b: string; }
omitBy(s, keyIsAorC);
// $ExpectType {} | { b: string; }
omitBy(sOrU, keyIsAorC);
// $ExpectType {} | { b: string; }
omitBy(sOrN, keyIsAorC);
// $ExpectType { 2: string | undefined; }
omitBy(o, keyIsAorC);
// $ExpectType {} | { 2: string | undefined; }
omitBy(oOrU, keyIsAorC);
// $ExpectType {} | { 2: string | undefined; }
omitBy(oOrN, keyIsAorC);

// $ExpectType { b: string; c: Date | Document; }
omitBy(s, keyIsAorNumber);
// $ExpectType {} | { b: string; c: Date | Document; }
omitBy(sOrU, keyIsAorNumber);
// $ExpectType {} | { b: string; c: Date | Document; }
omitBy(sOrN, keyIsAorNumber);
// $ExpectType { 2: string | undefined; c: Date | Document; }
omitBy(o, keyIsAorNumber);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
omitBy(oOrU, keyIsAorNumber);
// $ExpectType {} | { 2: string | undefined; c: Date | Document; }
omitBy(oOrN, keyIsAorNumber);

const so = {} as { [key: string]: number | string };
// $ExpectType { [x: string]: number | undefined; }
omitBy(so, isString);
// $ExpectType { [x: string]: string | undefined; }
omitBy(so, isNumber);
// $ExpectType { [x: string]: string | number; }
omitBy(so, isDate);
// $ExpectType { [x: string]: number | undefined; }
omitBy(so, isDateOrString);
// $ExpectType {}
omitBy(so, keyIsString);
// $ExpectType { [x: string]: string | number | undefined; }
omitBy(so, keyIsA);
// $ExpectType { [x: string]: string | number; }
omitBy(so, keyIsNumber);
