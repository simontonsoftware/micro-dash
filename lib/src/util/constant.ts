export function constant<T>(value: T) {
  return () => value;
}
