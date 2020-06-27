import { toPairs } from '../../lib/object';

// $ExpectType ["a" | "b", number][]
toPairs({ a: 1, b: 2 });
// todo: fancier typing for arrays
