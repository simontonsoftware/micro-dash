import includes from 'lodash-es/includes';

console.log(
  includes([1, 2, 3], 2, 1),
  includes({ a: 1, b: 2, c: 3 }, 2),
  includes('123', 'hi'),
);
