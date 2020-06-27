import { bindKey } from '../../public-api';

const obj0 = { fn: () => 'hi' };
// $ExpectType () => string
bindKey(obj0, 'fn');

const obj1 = { fn: (str: string) => Number(str) };
// $ExpectType (str: string) => number
bindKey(obj1, 'fn');
// $ExpectType () => number
bindKey(obj1, 'fn', '1');

const obj2 = { fn: (a: number, b: string) => a + b };
// $ExpectType (a: number, b: string) => string
bindKey(obj2, 'fn');
// $ExpectType (b: string) => string
bindKey(obj2, 'fn', 1);
// $ExpectType () => string
bindKey(obj2, 'fn', 1, '2');

const obj3 = { fn: (a: number, b: number, c: string) => a + b + c };
// $ExpectType (a: number, b: number, c: string) => string
bindKey(obj3, 'fn');
// $ExpectType (b: number, c: string) => string
bindKey(obj3, 'fn', 1);
// $ExpectType (c: string) => string
bindKey(obj3, 'fn', 1, 2);
// $ExpectType () => string
bindKey(obj3, 'fn', 1, 2, '3');

const obj4 = {
  fn: (a: number, b: number, c: number, d: string) => a + b + c + d,
};
// $ExpectType (a: number, b: number, c: number, d: string) => string
bindKey(obj4, 'fn');
// $ExpectType (b: number, c: number, d: string) => string
bindKey(obj4, 'fn', 1);
// $ExpectType (c: number, d: string) => string
bindKey(obj4, 'fn', 1, 2);
// $ExpectType (d: string) => string
bindKey(obj4, 'fn', 1, 2, 3);
// $ExpectType () => string
bindKey(obj4, 'fn', 1, 2, 3, '4');

const obj5 = {
  fn: (a: number, b: number, c: number, d: number, e: string) =>
    a + b + c + d + e,
};
// $ExpectType (...args: any[]) => string
bindKey(obj5, 'fn', 1, 2, 3, 4, '5');
