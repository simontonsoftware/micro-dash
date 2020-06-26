import { isEqual } from 'micro-dash';

isEqual('a', []);
isEqual({}, {});
isEqual([], 'a');
