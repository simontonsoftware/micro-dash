import { isFunction } from 'micro-dash';

console.log(isFunction('a'));
console.log(isFunction(() => {}));
