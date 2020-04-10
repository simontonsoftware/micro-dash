import { reduceRight } from "micro-dash";

reduceRight([], () => {});
reduceRight({ a: 1 }, (key) => key);
