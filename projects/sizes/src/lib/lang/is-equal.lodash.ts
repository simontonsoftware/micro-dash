import isEqual from 'lodash-es/isEqual';
isEqual('a', []);
isEqual({}, {});
isEqual([], 'a');
