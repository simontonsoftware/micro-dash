/**
 * Checks if value is classified as a String primitive or object.
 */
export function isString(value: any): value is string {
  return typeof value === 'string';
}
