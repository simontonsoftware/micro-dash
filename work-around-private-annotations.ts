import * as fs from "fs";

// To build the library, we must make a change to some code in `node_modules`. :( It is reported as an issue to the Angular CLI, but for now make this modification ([source](https://github.com/dherges/ng-packagr/issues/485#issuecomment-384082012))

const path = "node_modules/ng-packagr/lib/ngc/create-emit-callback.js";
const oldCode = fs.readFileSync(path, "utf8");
const newCode = oldCode.replace(
  "shouldIgnoreWarningsForPath: filePath => false",
  "shouldIgnoreWarningsForPath: filePath => true",
);
fs.writeFileSync(path, newCode, "utf8");
