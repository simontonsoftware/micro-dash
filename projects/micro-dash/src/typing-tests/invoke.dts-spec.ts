import { Nil } from '../lib/interfaces';
import { invoke } from '../lib/object';

//
// empty path
//

// $ExpectType undefined
invoke({ a: () => 1 }, []);
// $ExpectType undefined
invoke({} as { a: () => string } | undefined, []);

//
// 1 element path
//

// $ExpectType number
invoke({ a: () => 1 }, ['a']);
// $ExpectType boolean
invoke({ a: (a: boolean) => a }, ['a'], true);
// $ExpectType string | undefined
invoke({} as { a?: () => string }, ['a']);
// $ExpectType string | undefined
invoke({} as { a: () => string } | Nil, ['a']);

//
// 2 element path
//

// $ExpectType number
invoke({ a: { b: () => 1 } }, ['a', 'b']);
// $ExpectType boolean
invoke({ a: { b: (a: boolean) => a } }, ['a', 'b'], true);
// $ExpecType string | undefined
invoke({} as { a: { b?: () => string } }, ['a', 'b']);
// $ExpecType string | undefined
invoke({} as { a?: { b: () => string } }, ['a', 'b']);
// $ExpecType string | undefined
invoke({} as { a: { b: () => string } } | Nil, ['a', 'b']);

//
// 3 element path
//

const path3: ['a', 'b', 'c'] = ['a', 'b', 'c'];
// $ExpectType number
invoke({ a: { b: { c: () => 1 } } }, path3);
// $ExpecType boolean
invoke({ a: { b: { c: (a: boolean) => a } } }, path3, true);
// $ExpecType string | undefined
invoke({} as { a: { b: { c?: () => string } } }, path3);
// $ExpecType string | undefined
invoke({} as { a: { b?: { c: () => string } } }, path3);
// $ExpecType string | undefined
invoke({} as { a?: { b: { c: () => string } } }, path3);
// $ExpecType string | undefined
invoke({} as { a: { b: { c: () => string } } } | Nil, path3);

// //
// // 4 element path
// //
//
// const path4: ["a", "b", "c", "d"] = ["a", "b", "c", "d"];
// // $ExpectType number
// invoke({ a: { b: { c: { d: () => 1 } } } }, path4);
// // $ExpecType boolean
// invoke({ a: { b: { c: { d: (a: boolean) => a } } } }, path4, true);
// // $ExpecType string | undefined
// invoke({} as { a: { b: { c: { d?: () => string } } } }, path4);
// // $ExpecType string | undefined
// invoke({} as { a: { b: { c?: { d: () => string } } } }, path4);
// // $ExpecType string | undefined
// invoke({} as { a: { b?: { c: { d: () => string } } } }, path4);
// // $ExpecType string | undefined
// invoke({} as { a?: { b: { c: { d: () => string } } } }, path4);
// // $ExpecType string | undefined
// invoke({} as { a: { b: { c: { d: () => string } } } } | Nil, path4);

//
// fallback: n element path
//

const pathN: string[] = ['a'];
// $ExpectType any
invoke({ a: () => 1 }, pathN);
