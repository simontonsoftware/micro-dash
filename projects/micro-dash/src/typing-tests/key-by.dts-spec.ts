import { keyBy } from '../lib/collection';
import { ObjectWith } from '../lib/interfaces';

const mapper = (value: number) => (value % 2 ? 'odd' : 'even');
interface O {
  a: number;
  b: number;
}
type A = number[];

// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy([1, 2], mapper);
// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy({ a: 1, b: 2 }, mapper);

const oOrN = null as O | null;
const oOrU = undefined as O | undefined;
const aOrN = null as A | null;
const aOrU = undefined as A | undefined;

// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy(oOrN, mapper);
// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy(oOrU, mapper);
// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy(aOrN, mapper);
// $ExpectType { odd?: number | undefined; even?: number | undefined; }
keyBy(aOrU, mapper);

type City = 'Nairobi' | 'Gulu';
const chooseMany: City[] = ['Nairobi', 'Gulu'];
// $ExpectType { Nairobi?: "Nairobi" | "Gulu" | undefined; Gulu?: "Nairobi" | "Gulu" | undefined; }
keyBy(chooseMany, (city) => city);

// https://github.com/simontonsoftware/micro-dash/issues/35
interface Named {
  name: string;
}
const namedArray: Named[] = [{ name: 'Jimmy' }];
const namedObject: ObjectWith<Named> = { a: { name: 'Jimmy' } };
// $ExpectType { [x: string]: Named; }
keyBy(namedArray, (e) => e.name);
// $ExpectType { [x: string]: Named; }
keyBy(namedObject, (e) => e.name);
