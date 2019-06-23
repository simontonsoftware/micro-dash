import { ObjectWith } from "s-ng-dev-utils";
import { toArray } from "../lang";
import { random } from "../math";

/**
 * Gets a random element from `collection`.
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 3,696 bytes
 * - Micro-dash: 600 bytes
 */
export function sample<T>(collection: T[] | ObjectWith<T>): T {
  collection = toArray(collection as any);
  return (collection as any)[random((collection as any[]).length - 1)];
}
