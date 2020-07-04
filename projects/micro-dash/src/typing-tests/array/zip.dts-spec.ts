import { zip } from '../../public-api';

// $ExpectType [string, string][]
zip(['a'], ['yes']);
// $ExpectType [string, string | number][]
zip(['a'], [1, 'no']);
// $ExpectType [string, number, Date][]
zip(['a'], [2], [new Date()]);
// $ExpectType [string, number, Date, null][]
zip(['a'], [2], [new Date()], [null]);
// $ExpectType string[][]
zip(['a'], ['b'], ['c'], ['d'], ['e']);
// $ExpectType (string | number)[][]
zip<string | number>(['a'], [2], ['c'], [4], ['e']);
// $ExpectType (string | null | undefined)[][]
zip(['a'], null, ['c'], undefined, ['e']);
