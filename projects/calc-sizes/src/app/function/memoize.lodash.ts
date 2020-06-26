import memoize from 'lodash-es/memoize';

memoize((a: any) => a)('a');
memoize(
  (a: any) => a,
  (b: any) => b,
)('a');
