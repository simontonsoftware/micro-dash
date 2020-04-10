import { random } from "micro-dash";

console.log(
  random(),
  random(true),
  random(5),
  random(5, true),
  random(1, 8),
  random(1, 8, false),
);
