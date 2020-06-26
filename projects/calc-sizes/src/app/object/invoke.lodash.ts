import invoke from 'lodash-es/invoke';
invoke({ a: (val: any) => console.log(val) }, ['hi']);
