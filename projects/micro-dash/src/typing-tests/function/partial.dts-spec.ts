import { partial } from '../../lib/function';

const fn0 = () => 'hi';
// $ExpectType () => string
partial(fn0);

const fn1 = (str: string) => Number(str);
// $ExpectType (str: string) => number
partial(fn1);
// $ExpectType () => number
partial(fn1, '1');

const fn2 = (a: number, b: string) => a + b;
// $ExpectType (a: number, b: string) => string
partial(fn2);
// $ExpectType (b: string) => string
partial(fn2, 1);
// $ExpectType () => string
partial(fn2, 1, '2');

const fn3 = (a: number, b: number, c: string) => a + b + c;
// $ExpectType (a: number, b: number, c: string) => string
partial(fn3);
// $ExpectType (b: number, c: string) => string
partial(fn3, 1);
// $ExpectType (c: string) => string
partial(fn3, 1, 2);
// $ExpectType () => string
partial(fn3, 1, 2, '3');

const fn4 = (a: number, b: number, c: number, d: string) => a + b + c + d;
// $ExpectType (a: number, b: number, c: number, d: string) => string
partial(fn4);
// $ExpectType (b: number, c: number, d: string) => string
partial(fn4, 1);
// $ExpectType (c: number, d: string) => string
partial(fn4, 1, 2);
// $ExpectType (d: string) => string
partial(fn4, 1, 2, 3);
// $ExpectType () => string
partial(fn4, 1, 2, 3, '4');

const fn5 = (a: number, b: number, c: number, d: number, e: string) =>
  a + b + c + d + e;
// $ExpectType (...args: any[]) => string
partial(fn5, 1, 2, 3, 4, '5');
