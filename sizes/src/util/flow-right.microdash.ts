import {flowRight} from 'micro-dash';
const increment = (x: number) => x + 1;
flowRight(increment, flowRight())(1);
