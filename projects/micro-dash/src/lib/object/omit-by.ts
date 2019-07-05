import { ObjectIteratee } from "../interfaces";
import { pickBy } from "./pick-by";

/**
 * The opposite of `pickBy`; this method creates an object composed of the own enumerable string keyed properties of `object` that `predicate` doesn't return truthy for.
 *
 * Differences from lodash:
 * - does not treat sparse arrays as dense
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 15,529 bytes
 * - Micro-dash: 407 bytes
 */
export function omitBy<T>(object: T, predicate: ObjectIteratee<T, boolean>) {
  return pickBy(object, (item, key) => !predicate(item, key));
}
