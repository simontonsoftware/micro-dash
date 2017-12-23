# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.1.0"></a>
# [2.1.0](https://github.com/simontonsoftware/micro-dash/compare/v2.0.0...v2.1.0) (2017-12-23)


### Features

* add `map()` ([2341b0e](https://github.com/simontonsoftware/micro-dash/commit/2341b0e))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/simontonsoftware/micro-dash/compare/v1.1.0...v2.0.0) (2017-12-09)


### Features

* add `filter()` ([37322d3](https://github.com/simontonsoftware/micro-dash/commit/37322d3))
* add `pickBy()` and `omitBy()` ([8238e9d](https://github.com/simontonsoftware/micro-dash/commit/8238e9d))
* Better typing for object iteratees ([f2b08f4](https://github.com/simontonsoftware/micro-dash/commit/f2b08f4))


### BREAKING CHANGES

* The type argument `T` for functions that receive an object iteratee changed from representing the values of the object to the object itself. This only affects you if you manually specify such a type argument (e.g. `forEach<ItemType>(...)` becomes `forEach<ObjectType>(...)`).



<a name="1.1.0"></a>
# [1.1.0](https://github.com/simontonsoftware/micro-dash/compare/v1.0.0...v1.1.0) (2017-11-27)


### Features

* add `debounce()` ([4f2f37f](https://github.com/simontonsoftware/micro-dash/commit/4f2f37f))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/simontonsoftware/micro-dash/compare/v0.6.0...v1.0.0) (2017-09-09)


### Features

* added `inRange()` ([a73f845](https://github.com/simontonsoftware/micro-dash/commit/a73f845))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/simontonsoftware/micro-dash/compare/v0.5.0...v0.6.0) (2017-08-18)


### Features

* added `clamp()` ([bc8a899](https://github.com/simontonsoftware/micro-dash/commit/bc8a899))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/simontonsoftware/micro-dash/compare/v0.4.0...v0.5.0) (2017-08-17)


### Features

* added `without()` ([31587fe](https://github.com/simontonsoftware/micro-dash/commit/31587fe))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/simontonsoftware/micro-dash/compare/v0.3.0...v0.4.0) (2017-08-13)


### Features

* added `memoize()` ([ca67bd6](https://github.com/simontonsoftware/micro-dash/commit/ca67bd6))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/simontonsoftware/micro-dash/compare/v0.2.2...v0.3.0) (2017-08-09)


### Features

* added `uniqueId()` ([dde8b7b](https://github.com/simontonsoftware/micro-dash/commit/dde8b7b))



<a name="0.2.2"></a>
## [0.2.2](https://github.com/simontonsoftware/micro-dash/compare/v0.2.1...v0.2.2) (2017-08-08)


### Bug Fixes

* `merge()` does less cloning ([1548939](https://github.com/simontonsoftware/micro-dash/commit/1548939))



<a name="0.2.1"></a>
## [0.2.1](https://github.com/simontonsoftware/micro-dash/compare/v0.2.0...v0.2.1) (2017-08-08)


### Bug Fixes

* allow integer key for `ObjectWith<T>` ([1439a0a](https://github.com/simontonsoftware/micro-dash/commit/1439a0a))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/simontonsoftware/micro-dash/compare/v0.1.0...v0.2.0) (2017-08-07)


### Features

* add `times()` ([e1968b6](https://github.com/simontonsoftware/micro-dash/commit/e1968b6))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/simontonsoftware/micro-dash/compare/v0.0.3...v0.1.0) (2017-08-06)


### Features

* add `once()` ([b6ede70](https://github.com/simontonsoftware/micro-dash/commit/b6ede70))



<a name="0.0.3"></a>
## 0.0.3 (2017-08-04)


### Bug Fixes

* `npm install micro-dash` error ([720d81b](https://github.com/simontonsoftware/micro-dash/commit/720d81b))



<a name="0.0.2"></a>
## 0.0.2 (2017-08-03)
