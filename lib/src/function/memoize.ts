import {identity} from '../util/identity';

export interface MemoizedFunction extends Function {
  cache: Map<any, any>;
  // cache: MapCache;
}

// export interface Memoize {
//   <T extends Function>(func: T, resolver?: Function): T & MemoizedFunction;
//
//   Cache: {
//     new(): MapCache;
//   };
// }
//
// export interface MapCache {
//   clear(): void;
//
//   delete(key: any): boolean;
//
//   get(key: any): any;
//
//   has(key: any): boolean;
//
//   set(key: any, value: any): MapCache;
// }

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is provided, it determines the cache key for storing the result based on the arguments provided to the memoized function. By default, the first argument provided to the memoized function is used as the map cache key. The `func` is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized function.
 *
 * Differences from lodash:
 * - does not coerce keys to a string; any object can be used as in an ES6 `Map`
 * - does not let you customize cache creation
 *
 * Contribution to minified bundle size, when it is the only function imported:
 * - Lodash: 4,030 bytes
 * - Micro-dash: 218 bytes
 */

export function memoize<T extends Function>(
  func: T, resolver: Function = identity,
): T & MemoizedFunction {
  const memoized: any = (function (this: any) {
    const cache = memoized.cache;
    const key = resolver.apply(this, arguments);
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      const value = func.apply(this, arguments);
      cache.set(key, value);
      return value;
    }
  });
  memoized.cache = new Map();
  return memoized;
}

// export const memoize = makeMemoize();
//
// class Cache implements MapCache {
//   private data: {};
//
//   constructor() {
//     this.clear();
//   }
//
//   clear() {
//     this.data = Object.create(null);
//     return this;
//   }
//
//   delete(key: any) {
//     if (this.has(key)) {
//       delete this.data[key];
//       return true;
//     } else {
//       return false;
//     }
//   }
//
//   has(key: any) {
//     return Object.prototype.hasOwnProperty.call(this.data, key);
//   }
//
//   get (key: any) {
//     return this.data[key];
//   }
//
//   set (key: any, value: any) {
//     this.data[key] = value;
//     return this;
//   }
// }
//
// function makeMemoize() {
//   const _memoize: Memoize = function <T extends Function>(
//     func: T, resolver: Function = identity,
//   ): T & MemoizedFunction {
//     const memoized: any = (function (this: any) {
//       const cache = memoized.cache;
//       const key = resolver.apply(this, arguments);
//       if (cache.has(key)) {
//         return cache.get(key);
//       } else {
//         const value = func.apply(this, arguments);
//         cache.set(key, value);
//         return value;
//       }
//     });
//     memoized.cache = new _memoize.Cache();
//     return memoized;
//   } as Memoize;
//
//   _memoize.Cache = Cache;
//   return _memoize;
// }
