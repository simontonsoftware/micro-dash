import {isMatch} from '../lang/is-match';

export function matches(source: object) {
  return (value: object) => isMatch(value, source);
}
