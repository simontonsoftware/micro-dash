To work around an incompatibility with `@angular/cli` and the current way we generate documentation, make this modification ([source](https://github.com/dherges/ng-packagr/issues/485#issuecomment-384082012))
```js
// in node_modules/ng-packagr/lib/ngc/create-emit-callback.js
// seach for this line and change `false` to `true`
shouldIgnoreWarningsForPath: filePath => false,
```
