import { mapValues } from '../lib/object';

type A = number[];
const a = (null as unknown) as A;
const aOrN = a as A | null;
const aOrU = a as A | undefined;

// $ExpectType { [index: number]: string; }
mapValues(a, String);
// $ExpectType {} | { [index: number]: string; }
mapValues(aOrN, String);
// $ExpectType {} | { [index: number]: string; }
mapValues(aOrU, String);

interface O {
  a: number;
  b: number;
}
const o = (null as unknown) as O;
const oOrN = o as O | null;
const oOrU = o as O | undefined;

// $ExpectType { a: string; b: string; }
mapValues(o, String);
// $ExpectType {} | { a: string; b: string; }
mapValues(oOrN, String);
// $ExpectType {} | { a: string; b: string; }
mapValues(oOrU, String);
