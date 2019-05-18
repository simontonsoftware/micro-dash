import { flow } from "micro-dash";

const increment = (x: number) => x + 1;
flow(
  increment,
  flow(),
)(1);
