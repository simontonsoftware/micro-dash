import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as readline from "readline";
import { rollup, RollupOptions } from "rollup";
import { forEach } from "../micro-dash/src/lib/collection/for-each";
import { ObjectWith } from "../micro-dash/src/lib/interfaces";

// no typings for these imports
const uglify = require("rollup-plugin-uglify").uglify;
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const sourceMapExplorer = require("source-map-explorer");

const projectRootDir = path.join(__dirname, "..", "..");
const distDir = path.join(projectRootDir, "dist");
const buildDir = path.join(distDir, "sizes", "esm5", "lib");
const bundleDir = path.join(__dirname, "bundle/");

const rollupConfig: RollupOptions = {
  input: "thiswillchange",
  inlineDynamicImports: false,
  onwarn(warning) {
    console.warn(warning);
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      module: true,
      customResolveOptions: { paths: [distDir] },
    }),
    commonjs(),
    uglify(),
  ],
};

run();

async function run() {
  await recursiveMkDir(bundleDir);

  while (true) {
    const input = await getInput(
      'Filename base, "full" for index, or "all" for all: ',
    );

    switch (input) {
      case "full":
        await bundleAndExplore(`index.*.js`);
        break;
      case "all":
        await bundleAndExplore(`**/*.js`);
        break;
      default:
        await bundleAndExplore(`**/${input}.*.js`);
    }
    if (!input) {
    }
  }
}

function getInput(text: string) {
  return new Promise<string>((resolve) => {
    const reader = readline.createInterface(process.stdin, process.stdout);
    reader.question(text, (answer) => {
      resolve(answer);
      reader.close();
    });
  });
}

async function bundleAndExplore(fileGlob: string) {
  const inputPaths = await getPaths(fileGlob);
  for (const inputPath of inputPaths) {
    const outputPath = await bundle(inputPath);
    explore(outputPath);
  }
}

function getPaths(fileGlob: string) {
  return new Promise<string[]>((resolve) => {
    glob(path.join(buildDir, fileGlob), { nodir: true }, (err, files) => {
      resolve(files);
    });
  });
}

async function bundle(inputPath: string) {
  const relativePath = path.relative(buildDir, inputPath);

  // lodash files come first, so print only on those
  const lodashIndex = relativePath.indexOf(".lodash.js");
  if (lodashIndex > 0) {
    console.log(relativePath.substr(0, lodashIndex));
  }

  rollupConfig.input = inputPath;
  const dest = path.join(bundleDir, relativePath);
  const fileBuild = await rollup(rollupConfig);
  await fileBuild.write({
    file: dest,
    format: "iife",
    sourcemap: true,
    name: "thisIsIgnoredButRequired",
  });
  return dest;
}

function explore(file: string) {
  const basePath = file.substring(0, file.length - 2);
  const files: ObjectWith<number> = sourceMapExplorer(file).files;

  let lodash = 0;
  let microdash = 0;
  forEach(files, (bytes, sourceFile) => {
    if (sourceFile.includes("lodash")) {
      lodash += bytes;
    } else if (sourceFile.includes("micro-dash")) {
      microdash += bytes;
    }
  });
  let summary;
  if (lodash > 0) {
    summary = ` * - Lodash: ${lodash.toLocaleString()} bytes`;
  } else if (microdash > 0) {
    summary = ` * - Micro-dash: ${microdash.toLocaleString()} bytes`;
  }
  console.log(summary);
  fs.writeFileSync(basePath + "txt", summary);
}

// Recursively create a dir.
function recursiveMkDir(dir: string) {
  if (!fs.existsSync(dir)) {
    recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
