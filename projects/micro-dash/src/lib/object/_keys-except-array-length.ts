import { ObjectIteratee } from "../interfaces";
import { keys } from "./keys";

/** @hidden */
export function forOwnExceptArrayLength<T, O>(
  object: T,
  iteratee: ObjectIteratee<T, O>,
) {
  for (const key of keys(object)) {
    if (key !== "length" || !Array.isArray(object)) {
      iteratee(object[key as keyof T], key);
    }
  }
}
