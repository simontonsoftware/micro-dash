import { writeFileSync } from "fs";
import { format } from "prettier";

const packageJson = require("./package.json");
const libPackageJson = require("./projects/micro-dash/package.json");
writeFileSync(
  "./projects/micro-dash/package.json",
  format(JSON.stringify({ ...libPackageJson, version: packageJson.version }), {
    parser: "json",
  }),
);
