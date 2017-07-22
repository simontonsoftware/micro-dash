import {flow} from './flow';
import {Transformer} from '../interfaces';

export function flowRight<T>(...funcs: Array<Transformer<T>>): Transformer<T> {
  return flow(...funcs.reverse());
}
