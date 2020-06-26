import { every } from 'micro-dash';

console.log(
  every([1], () => true),
  every({ a: 1 }, () => false),
);
