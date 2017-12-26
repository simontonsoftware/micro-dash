Micro-dash offers a subset of the functionality found in [lodash](https://github.com/lodash/lodash), with drastrically reduced bundle size.

[![Build Status](https://travis-ci.org/simontonsoftware/micro-dash.svg?branch=master)](https://travis-ci.org/simontonsoftware/micro-dash) [![Coverage Status](https://coveralls.io/repos/github/simontonsoftware/micro-dash/badge.svg?branch=master)](https://coveralls.io/github/simontonsoftware/micro-dash?branch=master)

## API Documentation

To quickly see which functions are available, and any difference from Lodash beyond the overarching ones listed below, see the [api documentation](https://simontonsoftware.github.io/micro-dash/typedoc).

## Installation

Install `micro-dash` from npm:

```
npm install micro-dash --save
# OR
yarn add micro-dash
```

## Project goals

**The main goals of this project are:**

- Api compatibility with lodash. Not in the sense that each function can do everything that its lodash courterpart can do; most are simplified (see the philosophical differences below). But they have the same names, signatures, and basic functionality.
- Small payload size. This full package is `4,744 bytes` minified, while a bundle containing the corresponding lodash functions is `42,092 bytes`. Size comparisons when importing individual functions can be even more dramatic. Those comparisons are provided in each function's [documentation](https://simontonsoftware.github.io/micro-dash/typedoc).
- Pass all tests from the lodash test suite that are relevant given the differences below.
- Supply build artifacts according to the [Angular Package Format](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs), for an optimal experience using all the common, modern build chains. This does not mean `micro-dash` is designed for Angular - it contains generic utility functions useful in any modern javascript environment. The Angular Package Format is the structure followed by the Angular team, published as a recommendation to improve any support libraries.

**Goals that are _not_ part of this project:**
- Complete feature parity with lodash. This project does not aspire to have a "micro" version of every function in lodash.
- Additional functions that are not part of lodash. While there may be many other handy "utility" functions in the world, they do not belong in this library.

## Differences from lodash

Below are the main differences between the implementations in this library compared to lodash. Other differences, when they exist, are listed in the [documentation](https://simontonsoftware.github.io/micro-dash/typedoc) for each function.
- Only designed to work with primitives, plain objects, and arrays. It it not designed or tested to handle inherited properties, symbol keys, `arguments` objects, primitive objects (e.g. `Object(1)`), Dates, Maps, Sets, etc.
- Makes no special attempt to coerce arguments to the expected type, nor to check the type of arguments. Behavior is undefined in such cases.
- There is no shorthand for "iteratees"; functions that accept one require you to provide an actual function.
- Does not pass the iterated object to iteratee functions. This allows simplifications, e.g. methods like `merge` can be used as an iteratee for `reduce` without being guarded.
- It has no special knowledge of "array like" objects; only actual arrays are treated as arrays.
- String functions are designed for simple cases like variable names. They only treat `[0-9A-Za-z]` as part of words and are not smart about contractions or ordinals (e.g. `I'll` or `1st`).
- A modern environment/buildchain is assumed. E.g. this project will not contain duplicates of ES6 functions (such as `Array.isArray()`), and it may use ES6 functions directly. If you target older browsers/environments, you may need to include polyfills separately. However, it will only use features that _can_ be polyfilled.

## Credits
- **[Lodash](https://github.com/lodash/lodash)** - on which this entire project's API is based, most of its tests, and some of its source.
- **[DefinitelyTyped/lodash](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/lodash)** - on which some of the more complicated type definitions are based.
- **[Mini-dash](https://github.com/healthiers/mini-dash)** - from which this project draws inspiration, and a few tests.
- **[Angular QuickStart Lib](https://github.com/filipesilva/angular-quickstart-lib)** - which served as the starting point for project configuration (forked on [Jul 22, 2017](https://github.com/filipesilva/angular-quickstart-lib/commit/c687d9a3c00c8db5c290f0dfb243172f8dbfdf40)).
