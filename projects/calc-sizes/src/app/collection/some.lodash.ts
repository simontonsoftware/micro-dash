import some from "lodash-es/some";

console.log(
  some([1], () => true),
  some({ a: 1 }, () => false),
);
