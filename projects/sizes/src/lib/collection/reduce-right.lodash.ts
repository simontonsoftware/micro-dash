import reduceRight from 'lodash-es/reduceRight';
reduceRight([], () => {});
reduceRight({ a: 1 }, (key) => key);
