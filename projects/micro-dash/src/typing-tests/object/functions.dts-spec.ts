import { functions } from '../../public-api';

// $ExpectType string[]
functions(['a', 'b']);
// $ExpectType ("a" | "b")[]
functions({ a: 1, b: 'hi ' });
