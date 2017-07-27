import {clone} from 'micro-dash';
import _clone from 'lodash-es/clone';
clone('a');
clone({});
clone([]);
_clone('a');
_clone({});
_clone([]);
