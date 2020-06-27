import { union } from '../../lib/array';

// $ExpectType number[]
union([1]);
// $ExpectType string[]
union(['hi'], ['mom']);
// $ExpectType (string | number)[]
union<string | number>([1], ['hi']);
