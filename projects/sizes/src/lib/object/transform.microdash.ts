import { transform } from "micro-dash";

console.log(
  transform({ a: false, b: true }, (accum, value, key) => (accum[key] = value)),
);
