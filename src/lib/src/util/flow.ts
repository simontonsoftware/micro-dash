import {Transformer} from '../interfaces';
import {identity} from './identity';

export function flow<T>(...funcs: Array<Transformer<T>>): Transformer<T> {
  if (funcs.length) {
    return funcs.reduce((result, func) => (input: T) => result(func(input)));
  } else {
    return identity;
  }
}
