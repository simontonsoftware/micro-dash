# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
