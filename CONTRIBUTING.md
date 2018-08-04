- To build the documentation, you must make a change to some code in `node_modules`. :( It is reported as an issue to Typedoc, but for now make this modification ([source](https://github.com/TypeStrong/typedoc/pull/796)):
  ```
  cd node_modules\typedoc
  npm i typescript@2.9.2
  ```
