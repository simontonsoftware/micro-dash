import pullAt from "lodash-es/pullAt";

console.log(
  pullAt([1, 2, 3], 1),
  pullAt([1, 2, 3], [1]),
  pullAt([1, 2, 3], [1, 2]),
);
