import { pickBy } from 'micro-dash';

pickBy({ a: 1 }, () => true);
pickBy({ a: 1 }, () => false);
