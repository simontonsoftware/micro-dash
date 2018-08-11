import { keys } from '../object/keys';

/**
 * @private
 */
export function isEmpty(value: any) {
  if (!Array.isArray(value)) {
    value = keys(value);
  }
  return value.length === 0;
}
