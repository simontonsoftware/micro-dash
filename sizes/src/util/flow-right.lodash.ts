import flowRight from 'lodash-es/flowRight';
const increment = (x: number) => x + 1;
flowRight(increment, flowRight())(1);
