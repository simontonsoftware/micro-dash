// There's no good way to make this type safe.

// import { Function1 } from "../interfaces";
//
// /**
//  * Creates a function that returns the value at `path` of a given object.
//  *
//  * Contribution to minified bundle size, when it is the only function imported:
//  */
//
// export function property<T, K1 extends keyof T>(
//   path: [K1],
// ): Function1<T, T[K1]>;
// export function property<T, K1 extends keyof T, K2 extends keyof T[K1]>(
//   path: [K1, K2],
// ): Function1<T, T[K1][K2]>;
// export function property<
//   T,
//   K1 extends keyof T,
//   K2 extends keyof T[K1],
//   K3 extends keyof T[K1][K2]
// >(path: [K1, K2, K3]): Function1<T, T[K1][K2][K3]>;
// export function property<
//   T,
//   K1 extends keyof T,
//   K2 extends keyof T[K1],
//   K3 extends keyof T[K1][K2],
//   K4 extends keyof T[K1][K2][K3]
// >(path: [K1, K2, K3, K4]): Function1<T, T[K1][K2][K3][K4]>;
// // export function property(path: string[]): any;
//
// export function property(path: string[]) {
//   const length = path.length;
//   return (object: any) => {
//     let index = 0;
//     while (object != null && index < length) {
//       object = object[path[index++]];
//     }
//     return !index || index < length ? undefined : object;
//   };
// }
