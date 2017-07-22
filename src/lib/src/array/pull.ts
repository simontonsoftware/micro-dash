import {remove} from './remove';

export function pull<T>(array: T[], value: T) {
  remove(array, (item) => item === value);
}
