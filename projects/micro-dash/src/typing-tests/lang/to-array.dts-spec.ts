import { toArray } from '../../lib/lang';

// $ExpectType string[]
toArray('hi');
// $ExpectType number[]
toArray([1, 2, 3]);
// $ExpectType number[]
toArray({ a: 1, b: 2 });
// $ExpectType []
toArray(1);
// $ExpectType []
toArray(null);
