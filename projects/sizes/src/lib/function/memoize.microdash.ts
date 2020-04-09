import { memoize } from "micro-dash";

memoize((a: any) => a)("a");
memoize(
  (a: any) => a,
  (b: any) => b,
)("a");
