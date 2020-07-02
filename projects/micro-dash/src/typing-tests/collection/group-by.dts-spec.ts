import { groupBy } from '../../lib/collection/group-by';

const a = [1] as number[];
const aOrU = [1] as number[] | undefined;
const aOrN = [1] as number[] | null;
const o = { a: 1 } as { a: number };
const oOrU = { a: 1 } as { a: number } | undefined;
const oOrN = { a: 1 } as { a: number } | null;

// $ExpectType { [x: string]: number[]; }
groupBy(a, (): string => 'hi');
// $ExpectType { hi: number[] | undefined; there: number[] | undefined; }
groupBy(a, (): 'hi' | 'there' => 'hi');
// $ExpectType { [x: number]: number[]; }
groupBy(o, (): number => 1);
// $ExpectType { 1: number[] | undefined; 2: number[] | undefined; }
groupBy(o, (): 1 | 2 => 1);

// $ExpectType { [x: string]: number[]; }
groupBy(aOrN, (): string => 'a');
// $ExpectType { [x: string]: number[]; }
groupBy(oOrU, (): string => 'a');
