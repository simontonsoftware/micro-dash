import { every } from 'micro-dash';
every([1], () => true);
every({ a: 1 }, () => false);
