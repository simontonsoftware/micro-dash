/**
 * Casts `value` as an array if it's not one.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 118 bytes
 * - Micro-dash: 44 bytes
 */
export function castArray<T>(value: T): T extends unknown[] ? T : T[] {
  return (Array.isArray(value) ? value : [value]) as any;
}
