import { reduce } from "micro-dash";

reduce([], () => {});
reduce({ a: 1 }, (key) => key);
