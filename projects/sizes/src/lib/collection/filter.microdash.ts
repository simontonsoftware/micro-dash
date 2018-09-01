import { filter } from "micro-dash";
filter([1], () => true);
filter({ a: 1 }, () => false);
