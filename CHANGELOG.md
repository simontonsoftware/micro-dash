# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [6.2.0](https://github.com/simontonsoftware/micro-dash/compare/v6.1.0...v6.2.0) (2019-06-23)

### Bug Fixes

- to match lodash, `includes()` now returns `false` for a string when `fromIndex` is greater than its length ([c81a920](https://github.com/simontonsoftware/micro-dash/commit/c81a920))

### Features

- add `concat()` ([bc4eec2](https://github.com/simontonsoftware/micro-dash/commit/bc4eec2))
- add `difference()` ([341fbd1](https://github.com/simontonsoftware/micro-dash/commit/341fbd1))
- add `initial()` ([1f6aece](https://github.com/simontonsoftware/micro-dash/commit/1f6aece))
- add `pullAll()` ([950c42b](https://github.com/simontonsoftware/micro-dash/commit/950c42b))
- add `sample()` ([2b1506c](https://github.com/simontonsoftware/micro-dash/commit/2b1506c))
- add `toArray()` ([7d112e2](https://github.com/simontonsoftware/micro-dash/commit/7d112e2))
- add `transform()` ([3cc721b](https://github.com/simontonsoftware/micro-dash/commit/3cc721b))
- add `union()` ([2b28c0b](https://github.com/simontonsoftware/micro-dash/commit/2b28c0b))
- add `uniqBy()` ([05995ba](https://github.com/simontonsoftware/micro-dash/commit/05995ba))

## [6.1.0](https://github.com/simontonsoftware/micro-dash/compare/v6.0.0...v6.1.0) (2019-06-15)

### Features

- add `invoke()` ([6726c8e](https://github.com/simontonsoftware/micro-dash/commit/6726c8e))
- add the ability to cancel a debounced function ([74ca209](https://github.com/simontonsoftware/micro-dash/commit/74ca209))

## [6.0.0](https://github.com/simontonsoftware/micro-dash/compare/v5.6.0...v6.0.0) (2019-05-30)

### chore

- Don't export undocumented utility types ([7090508](https://github.com/simontonsoftware/micro-dash/commit/7090508))

### Features

- add `bindKey()` ([f687060](https://github.com/simontonsoftware/micro-dash/commit/f687060))
- better typing for `get()` ([0d2264a](https://github.com/simontonsoftware/micro-dash/commit/0d2264a))
- improve typing of `debounce()` ([3918a43](https://github.com/simontonsoftware/micro-dash/commit/3918a43))
- improve typing of `once()` ([61a35b8](https://github.com/simontonsoftware/micro-dash/commit/61a35b8))
- improve typing of `partial()` ([c101492](https://github.com/simontonsoftware/micro-dash/commit/c101492))
- upgrade typescript ([9e8a694](https://github.com/simontonsoftware/micro-dash/commit/9e8a694))

### BREAKING CHANGES

- A number of undocumented type definitions were previously available if you knew where to find them. They are no longer. Some moved to `s-ng-dev-utils`, so if you miss them check to see if they are still available there.
- Upgrades typescript to 3.4

<a name="5.6.0"></a>

# [5.6.0](https://github.com/simontonsoftware/micro-dash/compare/v5.5.0...v5.6.0) (2019-04-10)

### Features

- add `isBoolean()` ([c3cbcc2](https://github.com/simontonsoftware/micro-dash/commit/c3cbcc2))
- add `isNumber()` ([c5faf27](https://github.com/simontonsoftware/micro-dash/commit/c5faf27))
- add `random()` ([2267319](https://github.com/simontonsoftware/micro-dash/commit/2267319))

<a name="5.5.0"></a>

# [5.5.0](https://github.com/simontonsoftware/micro-dash/compare/v5.4.0...v5.5.0) (2019-02-24)

### Features

- add `includes()` ([a995528](https://github.com/simontonsoftware/micro-dash/commit/a995528))
- add `round()` ([8368578](https://github.com/simontonsoftware/micro-dash/commit/8368578))

<a name="5.4.0"></a>

# [5.4.0](https://github.com/simontonsoftware/micro-dash/compare/v5.3.0...v5.4.0) (2019-01-05)

### Features

- add `keys()` ([7668be8](https://github.com/simontonsoftware/micro-dash/commit/7668be8))

<a name="5.3.0"></a>

# [5.3.0](https://github.com/simontonsoftware/micro-dash/compare/v5.2.0...v5.3.0) (2018-12-17)

### Features

- improve typing for several functions (remove, filter, find, pick, pickBy, isNil) ([1d0a699](https://github.com/simontonsoftware/micro-dash/commit/1d0a699))

<a name="5.2.0"></a>

# [5.2.0](https://github.com/simontonsoftware/micro-dash/compare/v5.1.0...v5.2.0) (2018-12-08)

### Features

- add `isRegExp()` ([0184ed6](https://github.com/simontonsoftware/micro-dash/commit/0184ed6))
- add `sumBy()` ([bbb4247](https://github.com/simontonsoftware/micro-dash/commit/bbb4247))

<a name="5.1.0"></a>

# [5.1.0](https://github.com/simontonsoftware/micro-dash/compare/v5.0.0...v5.1.0) (2018-11-27)

### Features

- add `chunk()` ([d3c16d5](https://github.com/simontonsoftware/micro-dash/commit/d3c16d5))
- add `isFunction()` ([2654a79](https://github.com/simontonsoftware/micro-dash/commit/2654a79))
- add `snakeCase()` ([0ec3771](https://github.com/simontonsoftware/micro-dash/commit/0ec3771))

<a name="5.0.0"></a>

# [5.0.0](https://github.com/simontonsoftware/micro-dash/compare/v4.3.0...v5.0.0) (2018-11-10)

### Chores

- upgrade build tools ([b6c8927](https://github.com/simontonsoftware/micro-dash/commit/b6c8927))

### Features

- begin using `unknown`, other small typing improvements ([f46c106](https://github.com/simontonsoftware/micro-dash/commit/f46c106))

### BREAKING CHANGES

- uses Typescript 3 (up from 2)

<a name="4.3.0"></a>

# [4.3.0](https://github.com/simontonsoftware/micro-dash/compare/v4.2.0...v4.3.0) (2018-09-15)

### Features

- add `uniq()` ([ba42c19](https://github.com/simontonsoftware/micro-dash/commit/ba42c19))

<a name="4.2.0"></a>

# [4.2.0](https://github.com/simontonsoftware/micro-dash/compare/v4.1.1...v4.2.0) (2018-09-02)

### Features

- add `toString()` ([f6ae244](https://github.com/simontonsoftware/micro-dash/commit/f6ae244))

<a name="4.1.1"></a>

## [4.1.1](https://github.com/simontonsoftware/micro-dash/compare/v4.1.0...v4.1.1) (2018-08-31)

### Features

- `once()` releases wrapped function for garbage collection when it is no longer needed ([c584211](https://github.com/simontonsoftware/micro-dash/commit/c584211))

<a name="4.1.0"></a>

# [4.1.0](https://github.com/simontonsoftware/micro-dash/compare/v4.0.0...v4.1.0) (2018-08-14)

### Features

- add `castArray()` ([44d0c88](https://github.com/simontonsoftware/micro-dash/commit/44d0c88))
- add `pullAt()` ([db8efbc](https://github.com/simontonsoftware/micro-dash/commit/db8efbc))
- add `sortBy()` ([baf018b](https://github.com/simontonsoftware/micro-dash/commit/baf018b))

<a name="4.0.0"></a>

# [4.0.0](https://github.com/simontonsoftware/micro-dash/compare/v3.6.0...v4.0.0) (2018-08-11)

### Bug Fixes

- test and fix behavior for `null` and `undefined` of some functions ([cf9e93b](https://github.com/simontonsoftware/micro-dash/commit/cf9e93b))

### Features

- add `find()` ([8f6a7f1](https://github.com/simontonsoftware/micro-dash/commit/8f6a7f1))
- add `isEmpty()` ([5e1e7fb](https://github.com/simontonsoftware/micro-dash/commit/5e1e7fb))
- add `isMatch()` ([4547bff](https://github.com/simontonsoftware/micro-dash/commit/4547bff))
- add `keys()` ([6ef2f0e](https://github.com/simontonsoftware/micro-dash/commit/6ef2f0e))
- add `matches()` ([06a9ef8](https://github.com/simontonsoftware/micro-dash/commit/06a9ef8))

### BREAKING CHANGES

- upgrade to TypeScript 2.9

<a name="3.6.0"></a>

# [3.6.0](https://github.com/simontonsoftware/micro-dash/compare/v3.5.0...v3.6.0) (2018-07-21)

### Features

- add `isUndefined()` ([6bed3b3](https://github.com/simontonsoftware/micro-dash/commit/6bed3b3))

<a name="3.5.0"></a>

# [3.5.0](https://github.com/simontonsoftware/micro-dash/compare/v3.4.0...v3.5.0) (2018-05-08)

### Features

- add `last()` ([50d17e2](https://github.com/simontonsoftware/micro-dash/commit/50d17e2))

<a name="3.4.0"></a>

# [3.4.0](https://github.com/simontonsoftware/micro-dash/compare/v3.3.0...v3.4.0) (2018-04-14)

### Features

- add `pad()`, `padStart()` and `padEnd()` ([2bf07c5](https://github.com/simontonsoftware/micro-dash/commit/2bf07c5))

<a name="3.3.0"></a>

# [3.3.0](https://github.com/simontonsoftware/micro-dash/compare/v3.2.0...v3.3.0) (2018-04-07)

### Features

- add `isNil()` ([23af0d1](https://github.com/simontonsoftware/micro-dash/commit/23af0d1))

<a name="3.2.0"></a>

# [3.2.0](https://github.com/simontonsoftware/micro-dash/compare/v3.1.0...v3.2.0) (2018-01-01)

### Features

- add `zip()` ([60f3ef3](https://github.com/simontonsoftware/micro-dash/commit/60f3ef3))

<a name="3.1.0"></a>

# [3.1.0](https://github.com/simontonsoftware/micro-dash/compare/v3.0.0...v3.1.0) (2017-12-26)

### Features

- add `set()` and `update()` ([1cfc5fd](https://github.com/simontonsoftware/micro-dash/commit/1cfc5fd))

<a name="3.0.0"></a>

# [3.0.0](https://github.com/simontonsoftware/micro-dash/compare/v2.1.0...v3.0.0) (2017-12-23)

### Features

- add `every()` ([acf6462](https://github.com/simontonsoftware/micro-dash/commit/acf6462))

### BREAKING CHANGES

- Iteration functions (forEach, forEachRight, forOwn, and forOwnRight) now short-circuit when the iteratee returns `false`. This matches Lodash's behavior.

<a name="2.1.0"></a>

# [2.1.0](https://github.com/simontonsoftware/micro-dash/compare/v2.0.0...v2.1.0) (2017-12-23)

### Features

- add `map()` ([2341b0e](https://github.com/simontonsoftware/micro-dash/commit/2341b0e))

<a name="2.0.0"></a>

# [2.0.0](https://github.com/simontonsoftware/micro-dash/compare/v1.1.0...v2.0.0) (2017-12-09)

### Features

- add `filter()` ([37322d3](https://github.com/simontonsoftware/micro-dash/commit/37322d3))
- add `pickBy()` and `omitBy()` ([8238e9d](https://github.com/simontonsoftware/micro-dash/commit/8238e9d))
- Better typing for object iteratees ([f2b08f4](https://github.com/simontonsoftware/micro-dash/commit/f2b08f4))

### BREAKING CHANGES

- The type argument `T` for functions that receive an object iteratee changed from representing the values of the object to the object itself. This only affects you if you manually specify such a type argument (e.g. `forEach<ItemType>(...)` becomes `forEach<ObjectType>(...)`).

<a name="1.1.0"></a>

# [1.1.0](https://github.com/simontonsoftware/micro-dash/compare/v1.0.0...v1.1.0) (2017-11-27)

### Features

- add `debounce()` ([4f2f37f](https://github.com/simontonsoftware/micro-dash/commit/4f2f37f))

<a name="1.0.0"></a>

# [1.0.0](https://github.com/simontonsoftware/micro-dash/compare/v0.6.0...v1.0.0) (2017-09-09)

### Features

- added `inRange()` ([a73f845](https://github.com/simontonsoftware/micro-dash/commit/a73f845))

<a name="0.6.0"></a>

# [0.6.0](https://github.com/simontonsoftware/micro-dash/compare/v0.5.0...v0.6.0) (2017-08-18)

### Features

- added `clamp()` ([bc8a899](https://github.com/simontonsoftware/micro-dash/commit/bc8a899))

<a name="0.5.0"></a>

# [0.5.0](https://github.com/simontonsoftware/micro-dash/compare/v0.4.0...v0.5.0) (2017-08-17)

### Features

- added `without()` ([31587fe](https://github.com/simontonsoftware/micro-dash/commit/31587fe))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/simontonsoftware/micro-dash/compare/v0.3.0...v0.4.0) (2017-08-13)

### Features

- added `memoize()` ([ca67bd6](https://github.com/simontonsoftware/micro-dash/commit/ca67bd6))

<a name="0.3.0"></a>

# [0.3.0](https://github.com/simontonsoftware/micro-dash/compare/v0.2.2...v0.3.0) (2017-08-09)

### Features

- added `uniqueId()` ([dde8b7b](https://github.com/simontonsoftware/micro-dash/commit/dde8b7b))

<a name="0.2.2"></a>

## [0.2.2](https://github.com/simontonsoftware/micro-dash/compare/v0.2.1...v0.2.2) (2017-08-08)

### Bug Fixes

- `merge()` does less cloning ([1548939](https://github.com/simontonsoftware/micro-dash/commit/1548939))

<a name="0.2.1"></a>

## [0.2.1](https://github.com/simontonsoftware/micro-dash/compare/v0.2.0...v0.2.1) (2017-08-08)

### Bug Fixes

- allow integer key for `ObjectWith<T>` ([1439a0a](https://github.com/simontonsoftware/micro-dash/commit/1439a0a))

<a name="0.2.0"></a>

# [0.2.0](https://github.com/simontonsoftware/micro-dash/compare/v0.1.0...v0.2.0) (2017-08-07)

### Features

- add `times()` ([e1968b6](https://github.com/simontonsoftware/micro-dash/commit/e1968b6))

<a name="0.1.0"></a>

# [0.1.0](https://github.com/simontonsoftware/micro-dash/compare/v0.0.3...v0.1.0) (2017-08-06)

### Features

- add `once()` ([b6ede70](https://github.com/simontonsoftware/micro-dash/commit/b6ede70))

<a name="0.0.3"></a>

## 0.0.3 (2017-08-04)

### Bug Fixes

- `npm install micro-dash` error ([720d81b](https://github.com/simontonsoftware/micro-dash/commit/720d81b))

<a name="0.0.2"></a>

## 0.0.2 (2017-08-03)
