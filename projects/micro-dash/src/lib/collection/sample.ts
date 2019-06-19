import { ObjectWith } from "s-ng-dev-utils";
import { random } from "../math/random";
import { values } from "../object";

/**
 * Gets a random element from `collection`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,696 bytes
 * - Micro-dash: 562 bytes
 */
export function sample<T>(collection: T[] | ObjectWith<T>): T {
  if (!Array.isArray(collection)) {
    collection = values(collection);
  }
  return collection[random(collection.length - 1)];
}
