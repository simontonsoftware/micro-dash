import keyBy from 'lodash-es/keyBy';

keyBy([], () => 'a');
keyBy({}, () => 'a');
