# Integration App

This is a very simple app that uses a single function from `micro-dash`, to prove it is being built correctly.

## npm scripts

We've captured many of the most useful commands in npm scripts defined in the `package.json`:

* `yarn start` - runs the compiler and a server at the same time, both in "watch mode".
* `yarn run e2e` - compiles the app and run e2e tests.
* `yarn run e2e:aot` - compiles and the app with AOT and run e2e tests.

If you need to manually test a library build, first run this from the project root:
```
yarn run preintegration
```

Now the library is installed in your integration app. 

You can use `yarn start` to start a live reload server running the app in JIT mode, or `yarn run build && yarn run serve:aot` to run a static server in AOT mode.
