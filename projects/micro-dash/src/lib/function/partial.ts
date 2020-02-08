import { Drop1Arg, Drop2Args, Drop3Args, Drop4Args } from "../interfaces";

/**
 * Creates a function that invokes `func` with `partials` prepended to the arguments it receives. This method is like `bind` except it does not alter the `this` binding.
 *
 * Differences from lodash:
 * - there is no "placeholder" functionality
 * - sets the "length" property of partially applied functions
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 9,242 bytes
 * - Micro-dash: 108 bytes
 */

export function partial<F extends (...args: any[]) => any>(func: F): F;
export function partial<A1, F extends (arg1: A1, ...rest: any) => any>(
  func: F,
  arg1: A1,
): Drop1Arg<F>;
export function partial<A1, A2, F extends (...args: [A1, A2, ...any[]]) => any>(
  func: F,
  arg1: A1,
  arg2: A2,
): Drop2Args<F>;
export function partial<
  A1,
  A2,
  A3,
  F extends (...args: [A1, A2, A3, ...any[]]) => any
>(func: F, arg1: A1, arg2: A2, arg3: A3): Drop3Args<F>;
export function partial<
  A1,
  A2,
  A3,
  A4,
  F extends (...args: [A1, A2, A3, A4, ...any[]]) => any
>(func: F, arg1: A1, arg2: A2, arg3: A3, arg4: A4): Drop4Args<F>;

// catch-all
export function partial<
  A1,
  A2,
  A3,
  A4,
  F extends (...args: [A1, A2, A3, A4, ...any[]]) => any
>(
  func: F,
  ...args: [A1, A2, A3, A4, ...any[]]
): (...args: any[]) => ReturnType<F>;

export function partial(func: Function, ...partials: any[]) {
  return func.bind(undefined, ...partials);
}
