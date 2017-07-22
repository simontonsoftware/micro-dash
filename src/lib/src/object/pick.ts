export function pick<T>(object: T, paths: [keyof T]) {
  const obj: Partial<T> = {};
  for (const path of paths) {
    obj[path] = object[path];
  }
  return obj;
}
