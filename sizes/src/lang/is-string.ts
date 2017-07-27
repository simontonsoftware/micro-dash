import {isString} from 'micro-dash';
import _isString from 'lodash-es/isString';
isString('a');
isString({});
isString([]);
_isString('a');
_isString({});
_isString([]);
