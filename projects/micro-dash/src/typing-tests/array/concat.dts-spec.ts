import { concat } from '../../public-api';

// $ExpectType number[]
concat([1], 2);
// $ExpectType number[]
concat([1], [2]);
// $ExpectType number[]
concat([1], [2], 3);
// $ExpectType number[]
concat<number>([], 1);
