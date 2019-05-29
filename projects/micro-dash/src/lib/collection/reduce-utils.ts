/** @hidden */
export function doReduce(
  iterationFn: Function,
  collection: any,
  iteratee: Function,
  accumulator: any,
  initAccum: boolean,
) {
  iterationFn(collection, (value: any, indexOrKey: any) => {
    if (initAccum) {
      accumulator = value;
      initAccum = false;
    } else {
      accumulator = iteratee(accumulator, value, indexOrKey);
    }
  });
  return accumulator;
}
