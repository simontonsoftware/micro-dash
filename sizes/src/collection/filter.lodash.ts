import filter from 'lodash-es/filter';
filter([1], () => true);
filter({a: 1}, () => false);
