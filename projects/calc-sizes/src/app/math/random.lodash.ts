import random from 'lodash-es/random';

console.log(
  random(),
  random(true),
  random(5),
  random(5, true),
  random(1, 8),
  random(1, 8, false),
);
