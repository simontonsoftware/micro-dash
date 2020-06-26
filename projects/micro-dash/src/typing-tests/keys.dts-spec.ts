import { keys } from '../public-api';

// $ExpectType string[]
keys(['a', 'b']);
// $ExpectType ("a" | "b")[]
keys({ a: 1, b: 'hi ' });
