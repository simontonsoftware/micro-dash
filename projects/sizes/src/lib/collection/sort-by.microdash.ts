import { sortBy } from "micro-dash";

sortBy([1, 2], (i) => i);
sortBy({ a: 1, b: 2 }, [(i) => i, (i) => -i]);
