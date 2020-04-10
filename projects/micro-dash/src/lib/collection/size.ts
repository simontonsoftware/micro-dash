import { keys } from "../object";

/**
 * Gets the size of collection by returning the number of its own enumerable string keyed properties.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,301 bytes
 * - Micro-dash: 178 bytes
 */

export function size(collection: object): number;
// tslint:disable-next-line:unified-signatures
export function size(collection: any[] | string): number;

export function size(collection: object | any[] | string) {
  return keys(collection).length;
}
