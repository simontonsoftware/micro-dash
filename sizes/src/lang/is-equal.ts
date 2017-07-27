import {isEqual} from 'micro-dash';
import _isEqual from 'lodash-es/isEqual';
isEqual('a', []);
isEqual({}, {});
isEqual([], 'a');
_isEqual('a', []);
_isEqual({}, {});
_isEqual([], 'a');
