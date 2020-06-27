import { difference } from '../../lib/array';

// $ExpectType number[]
difference([1]);
// $ExpectType string[]
difference(['hi'], ['mom']);
// $ExpectType (string | number)[]
difference<string | number>([1], ['hi']);
