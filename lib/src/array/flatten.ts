export function flatten<T>(array: T[][]) {
  return ([] as T[]).concat(...array);
}
