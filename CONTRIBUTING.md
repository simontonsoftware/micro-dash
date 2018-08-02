- To build the library, you must making a change to some code in `node_modules`. :( It is reported as an issue to the Angular CLI, but for now make this modification ([source](https://github.com/dherges/ng-packagr/issues/485#issuecomment-384082012)):
  ```js
  // in node_modules/ng-packagr/lib/ngc/create-emit-callback.js
  // seach for this line and change `false` to `true`
  shouldIgnoreWarningsForPath: filePath => false,
  ```

- To build the documentation, you must make a change to some code in `node_modules`. :( It is reported as an issue to Typedoc, but for now make this modification ([source](https://github.com/TypeStrong/typedoc/pull/796)):
  ```
  cd node_modules\typedoc
  npm i typescript@2.9.2
  ```
