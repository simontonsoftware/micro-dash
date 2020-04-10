import every from "lodash-es/every";

console.log(
  every([1], () => true),
  every({ a: 1 }, () => false),
);
