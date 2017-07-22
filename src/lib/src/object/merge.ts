import {forOwn} from './for-own';

export function merge<T extends object>(
  object: T, ...sources: Array<Partial<T>>,
) {
  for (const source of sources) {
    forOwn<any>(source, (value, key) => {
      const myValue = object[key];
      if (myValue instanceof Object) {
        merge(myValue, value);
      } else {
        object[key] = value;
      }
    });
  }
  return object;
}
