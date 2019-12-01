import { flatMap } from "../lib/collection/flat-map";

const a = [1, 2];
const aOrN = a as number[] | null;
const aOrU = a as number[] | undefined;

// $ExpectType string[]
flatMap(a, () => "hi");
// $ExpectType string[]
flatMap(aOrN, () => "hi");
// $ExpectType string[]
flatMap(aOrU, () => "hi");
// $ExpectType string[]
flatMap(a, () => ["hi"]);
// $ExpectType string[]
flatMap(aOrN, () => ["hi"]);
// $ExpectType string[]
flatMap(aOrU, () => ["hi"]);
// $ExpectType string[]
flatMap(a, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[]
flatMap(aOrN, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[]
flatMap(aOrU, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[][]
flatMap(a, () => [["hi"]]);

interface O {
  a: number;
  b: string;
}
const o = { a: 1, b: "hi" } as O;
const oOrN = o as O | null;
const oOrU = o as O | undefined;

// $ExpectType string[]
flatMap(o, () => "hi");
// $ExpectType string[]
flatMap(oOrN, () => "hi");
// $ExpectType string[]
flatMap(oOrU, () => "hi");
// $ExpectType string[]
flatMap(o, () => ["hi"]);
// $ExpectType string[]
flatMap(oOrN, () => ["hi"]);
// $ExpectType string[]
flatMap(oOrU, () => ["hi"]);
// $ExpectType string[]
flatMap(o, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[]
flatMap(oOrN, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[]
flatMap(oOrU, (n) => (n ? "hi" : ["hi"]));
// $ExpectType string[][]
flatMap(o, () => [["hi"]]);
