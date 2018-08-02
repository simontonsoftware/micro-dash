/**
 * Creates an array of the own enumerable property names of object.
 *
 * Differences from lodash:
 *
 * Contribution to minified bundle size, when it is the only function imported:
 *
 * @private
 */
export const keys = Object.getOwnPropertyNames as <T>(
  object: T,
) => Array<keyof T>;
