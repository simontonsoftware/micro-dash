import {isMatch} from './is-match';

export function isEqual(value: any, other: any) {
  if (Object.is(value, other)) {
    return true;
  }
  if (
    !(value instanceof Object && other instanceof Object)
    || value.constructor !== other.constructor
  ) {
    return false;
  }
  for (const key of Object.getOwnPropertyNames(value)) {
    if (!value.hasOwnProperty(key)) {
      return false;
    }
  }
  return isMatch(value, other);
}
