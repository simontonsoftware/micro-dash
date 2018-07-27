import omitBy from 'lodash-es/omitBy';
omitBy({ a: 1 }, () => true);
omitBy({ a: 1 }, () => false);
