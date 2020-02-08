/**
 * Creates an array of elements split into groups the length of `size`. If `array` can't be split evenly, the final chunk will be the remaining elements.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 2,172 bytes
 * - Micro-dash: 139 bytes
 */
export function chunk<T>(array: T[], size = 1): T[][] {
  size = Math.max(Math.trunc(size), 0);
  const chunks = [];
  for (let i = 0; i < array.length; i += Math.max(1, size)) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
