export function get(object: object, path: string[]) {
  for (const item of path) {
    object = object && object[item];
  }
  return object;
}
