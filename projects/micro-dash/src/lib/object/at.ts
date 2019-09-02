import { flatten } from "../array";
import { IfCouldBe, Nil, Values } from "../interfaces";
import { get } from "./get";

type Trim<R extends any[], P extends any[]> = P[0] extends never
  ? []
  : P[1] extends never
  ? [R[0]]
  : P[2] extends never
  ? [R[0], R[1]]
  : P[3] extends never
  ? [R[0], R[1], R[2]]
  : P[4] extends never
  ? [R[0], R[1], R[2], R[3]]
  : R;

/**
 * Creates an array of values corresponding to `paths` of `object`.
 *
 * Differences from lodash:
 * - does not handle a dot-separated strings within `paths`
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash:
 * - Micro-dash:
 */

// Unwrapped keys
export function at<
  T,
  K1 extends keyof NonNullable<T> = never,
  K2 extends keyof NonNullable<T> = never,
  K3 extends keyof NonNullable<T> = never,
  K4 extends keyof NonNullable<T> = never,
  K5 extends keyof NonNullable<T> = never
>(
  object: T,
  k1?: K1,
  k2?: K2,
  k3?: K3,
  k4?: K4,
  k5?: K5,
  ...rest: Array<keyof NonNullable<T>>
):
  | Trim<
      [
        NonNullable<T>[K1],
        NonNullable<T>[K2],
        NonNullable<T>[K3],
        NonNullable<T>[K4],
        ...Array<Values<NonNullable<T>>>,
      ],
      [K1, K2, K3, K4, K5]
    >
  | IfCouldBe<T, Nil, Trim<Array<undefined>, [K1, K2, K3, K4, K5]>>;

// Wrapped keys
export function at<T, K1 extends keyof NonNullable<T>>(
  object: T,
  path: [K1],
): [NonNullable<T>[K1]] | IfCouldBe<T, Nil, [undefined]>;
export function at<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>
>(
  object: T,
  path: [K1, K2],
):
  | [NonNullable<T>[K1], NonNullable<T>[K2]]
  | IfCouldBe<T, Nil, [undefined, undefined]>;
export function at<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>,
  K3 extends keyof NonNullable<T>
>(
  object: T,
  path: [K1, K2, K3],
):
  | [NonNullable<T>[K1], NonNullable<T>[K2], NonNullable<T>[K3]]
  | IfCouldBe<T, Nil, [undefined, undefined, undefined]>;
  export function at<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>,
  K3 extends keyof NonNullable<T>,
  K4 extends keyof NonNullable<T>
>(
  object: T,
  path: [K1, K2, K3, K4],
):
  | [
      NonNullable<T>[K1],
      NonNullable<T>[K2],
      NonNullable<T>[K3],
      NonNullable<T>[K4],
    ]
  | IfCouldBe<T, Nil, [undefined, undefined, undefined, undefined]>;
  export function at<
  T,
  K1 extends keyof NonNullable<T>,
  K2 extends keyof NonNullable<T>,
  K3 extends keyof NonNullable<T>,
  K4 extends keyof NonNullable<T>
>(
  object: T,
  path: [K1, K2, K3, K4, ...Array<keyof NonNullable<T>>],
):
  | [
      NonNullable<T>[K1],
      NonNullable<T>[K2],
      NonNullable<T>[K3],
      NonNullable<T>[K4],
      ...Array<Values<NonNullable<T>>>
    ]
  | IfCouldBe<T, Nil, [undefined, undefined, undefined, undefined]>;

// export function at<T, P1K1 extends keyof NonNullable<T>>(
//   object: T,
//   path: [P1K1],
// ): [NonNullable<T>[P1K1]] | IfCouldBe<T, Nil, [undefined]>;
// export function at<
//   T,
//   P1K1 extends keyof NonNullable<T>,
//   P1K2 extends keyof NonNullable<T>[P1K1]
// >(
//   object: T,
//   path: [P1K1, P1K2],
// ): [NonNullable<T>[P1K1][P1K2]] | IfCouldBe<T, Nil, [undefined, undefined]>;
// export function at<
//   T,
//   P1K1 extends keyof NonNullable<T>,
//   P1K2 extends keyof NonNullable<T>[P1K1],
//   P1K3 extends keyof NonNullable<T>[P1K1][P1K2]
// >(
//   object: T,
//   path: [P1K1, P1K2, P1K3],
// ):
//   | [NonNullable<T>[P1K1][P1K2][P1K3]]
//   | IfCouldBe<T, Nil, [undefined, undefined, undefined]>;
// export function at<
//   T,
//   P1K1 extends keyof NonNullable<T>,
//   P1K2 extends keyof NonNullable<T>[P1K1],
//   P1K3 extends keyof NonNullable<T>[P1K1][P1K2],
//   P1K4 extends keyof NonNullable<T>[P1K1][P1K2][P1K3]
// >(
//   object: T,
//   path: [P1K1, P1K2, P1K3, P1K4],
// ):
//   | [NonNullable<T>[P1K1][P1K2][P1K3][P1K4]]
//   | IfCouldBe<T, Nil, [undefined, undefined, undefined, undefined]>;

export function at<T, K extends keyof T>(object: T, ...paths: [[K]]): [T[K]];

export function at(object: any, ...paths: any[]) {
  return flatten(paths).map((path) => get(object, path));
}
