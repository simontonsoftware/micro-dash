import { keys } from '../../public-api';

interface O {
  a: number;
  b: number;
}
interface W {
  a: number;
  2: string;
}
type A = number[];
const oOrU = undefined as undefined | O;
const oOrN = null as null | O;
const wOrU = undefined as undefined | W;
const wOrN = null as null | W;
const aOrU = undefined as undefined | A;
const aOrN = null as null | A;

// $ExpectType ("a" | "b")[]
keys({ a: 1, b: 2 });
// $ExpectType ("a" | "b")[]
keys(oOrU);
// $ExpectType ("a" | "b")[]
keys(oOrN);
// $ExpectType string[]
keys({ a: 2, 2: 'b' });
// $ExpectType string[]
keys(wOrU);
// $ExpectType string[]
keys(wOrN);
// $ExpectType string[]
keys([1, 2]);
// $ExpectType string[]
keys(aOrU);
// $ExpectType string[]
keys(aOrN);

// $ExpectType string[]
keys(['a', 'b']);
// $ExpectType ("a" | "b")[]
keys({ a: 1, b: 'hi ' });
