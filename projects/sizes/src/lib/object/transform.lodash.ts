import transform from "lodash-es/transform";

console.log(
  transform({ a: false, b: true }, (accum, value, key) => (accum[key] = value)),
);
