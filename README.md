Micro-dash offers a subset of the functionality found in [lodash](https://github.com/lodash/lodash), with drastrically reduced bundle size.

## Installation

Install `micro-dash` from npm:

```
npm install micro-dash --save
# OR
yarn add micro-dash
```

## Project goals:

**The main goals of this project are:**

- Api compatibility with lodash. Not in the sense that each function can do everything that its lodash courterpart can do; most are simplified (see the philosophical differences below). But they have the same names, signatures, and basic functionality.
- Small payload size. This full package is `3,249 bytes` minified, while a bundle containing the corresponding lodash functions is `38,208 bytes`. Size comparisons when importing individual functions are provided in their documentation.
- Pass all tests from the lodash test suite that are relevant given the differences below.

**Philosophical differences from lodash:**

- Only designed to work with primitives and plain objects. It it not designed or tested to handle inherited properties, symbol keys, `arguments` objects, primitive objects (e.g. `Object(1)`), Dates, Maps, Sets, etc.
- There is no shorthand for "iteratees" - functions that accept one expect you to pass an actual function.
- It has no special knowledge of "array like" objects; only actual arrays are treated as arrays.
- Does not pass the iterated object to iteratee functions. This allows simplifications, e.g. methods like `merge` can be used as an iteratee for `reduce` without being guarded.
- String functions are designed for simple cases like variable names. They only treat `[0-9A-Za-z]` as part of words and are not smart about contractions or ordinals (e.g. `I'll` or `1st`).
- A modern environment/buildchain is assumed. E.g. this project will not contain duplicates of ES6 functions (such as `Array.isArray()`), and it may use ES6 functions directly. If you target older browsers/environments, you may need to include polyfills separately. However, it will only use features that _can_ be polyfilled.
- <FESM / angular 4 module format>

Other differences are listed in the documentation for each function.

**Goals that are _not_ part of this project:**
- Complete feature parity with lodash. This project does not aspire to have a "micro" version of every function in lodash.
- Additional functions that are not part of lodash. While there may be many other handy "utility" functions in the world, they do not belong in this library.

## Credits
- **[Lodash](https://github.com/lodash/lodash)** - on which this entire project's API is based, most of its tests, and some of its source.
- **[DefinitelyTyped/lodash](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash)** - on which some of the more complicated type definitions are based.
- **[Mini-dash](https://github.com/healthiers/mini-dash)** - from which this project draws inspiration, and a few tests.
- **[Angular QuickStart Lib](https://github.com/filipesilva/angular-quickstart-lib)** - which served as the starting point for project configuration (branched on [Jul 22, 2017](https://github.com/filipesilva/angular-quickstart-lib/commit/c687d9a3c00c8db5c290f0dfb243172f8dbfdf40)).
