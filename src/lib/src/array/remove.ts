export function remove<T>(array: T[], predicate: (item: T) => boolean) {
  for (let i = array.length; --i >= 0; ) {
    if (predicate(array[i])) {
      array.splice(i, 1);
    }
  }
}
