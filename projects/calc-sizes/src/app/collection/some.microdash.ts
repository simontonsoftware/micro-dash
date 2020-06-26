import { some } from 'micro-dash';

console.log(
  some([1], () => true),
  some({ a: 1 }, () => false),
);
