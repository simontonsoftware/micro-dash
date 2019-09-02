import findKey from "lodash-es/findKey";

console.log(
  findKey([1, 2, 3], (n) => n === 2),
  findKey({ a: 1, b: 2, c: 3 }, (n) => n === 2),
);
