import { zipObject } from '../../lib/array';

// $ExpectType { [x: string]: string; }
zipObject(['a'], ['yes']);

// $ExpectType { [x: string]: number; }
zipObject(['a'], [1, 'no']);

// $ExpectType { [x: number]: number; } & { [x: string]: string; }
zipObject([1, 'b'], [1, 'yes']);

// $ExpectType { [x: number]: number; } & { [x: string]: number; }
zipObject([1, 'b'], [1, 2, 'no']);

// $ExpectType { [x: number]: number; } & { [x: string]: number; } & { [x: string]: string; }
zipObject([1, 'b', 'c'], [1, 2, 'yes']);

// $ExpectType { [x: number]: number; } & { [x: string]: number; } & { [x: string]: number; }
zipObject([1, 'b', 'c'], [1, 2, 3, 'no']);

// $ExpectType { [x: number]: number; } & { [x: string]: number; } & { [x: string]: number; } & { [x: string]: string; }
zipObject([1, 'b', 'c', 'd'], [1, 2, 3, 'yes']);

// $ExpectType { [x: number]: number; } & { [x: string]: number; } & { [x: string]: number; } & { [x: string]: number; }
zipObject([1, 'b', 'c', 'd'], [1, 2, 3, 4, 'no']);

// $ExpectType { [x: string]: number | undefined; }
zipObject(['a', 'b'] as string[], [1, 2]);
