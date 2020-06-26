import { invoke } from 'micro-dash';
invoke({ a: (val: any) => console.log(val) }, ['hi']);
