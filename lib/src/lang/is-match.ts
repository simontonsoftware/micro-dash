import {isEqual} from './is-equal';

export function isMatch(object: object, source: object) {
  for (const key of Object.getOwnPropertyNames(source)) {
    if (!(object.hasOwnProperty(key) && isEqual(object[key], source[key]))) {
      return false;
    }
  }
  return true;
}
