import {keyBy} from 'micro-dash';
import _keyBy from 'lodash-es/keyBy';
keyBy([], () => 'a');
keyBy({}, () => 'a');
_keyBy([], () => 'a');
_keyBy({}, () => 'a');
