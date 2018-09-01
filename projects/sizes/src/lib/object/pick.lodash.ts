import pick from "lodash-es/pick";
console.log(pick({ a: 1, b: 2, c: 3 }, "a", "c"));
console.log(pick(null as any, "a"));
