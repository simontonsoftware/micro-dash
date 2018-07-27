const fs = require('fs');
const path = require('path');
const glob = require('glob');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify').uglify;
const readline = require('readline');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const childProcess = require('child_process');

const projectRootDir = path.join(__dirname, '..', '..');
const distDir = path.join(projectRootDir, 'dist');
const sourceMapExplorer = path.join(
  projectRootDir, 'node_modules', 'source-map-explorer', 'index.js'
);
const buildDir = path.join(distDir, 'sizes', 'esm5', 'lib');
const bundleDir = path.join(__dirname, 'bundle/');
const microDashDir = path.join(distDir, 'micro-dash');

const forEach = require(microDashDir).forEach;

const rollupConfig = {
  onwarn: function (warning) {
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    console.warn(warning.message);
  },
  plugins: [
    nodeResolve({
      jsnext: true,
      module: true,
      customResolveOptions: { paths: [distDir] },
    }),
    commonjs(),
    uglify()
  ]
};

return run();

async function run() {
  await recursiveMkDir(bundleDir);

  let input = await getInput(
    'Filename bases, comma separated (blank for all): '
  );
  if (input) {
    for (const name of input.split(' ')) {
      await bundleAndExplore(`**/${name}.*.js`);
    }
    await bundleAndExplore(`index.*.js`);
  } else {
    await bundleAndExplore(`**/*.js`);
  }

  // hack, because I don't know how to node
  process.exit();
}

function getInput(text) {
  return new Promise((resolve) => {
    const reader = readline.createInterface(process.stdin, process.stdout);
    reader.question(text, (answer) => {
      resolve(answer);
      reader.close();
    });
  });
}

async function bundleAndExplore(fileGlob) {
  const inputPaths = await getPaths(fileGlob);
  for (const inputPath of inputPaths) {
    const outputPath = await bundle(inputPath);
    explore(outputPath);
  }
}

function getPaths(fileGlob) {
  return new Promise((resolve) => {
    glob(path.join(buildDir, fileGlob), { nodir: true }, (err, files) => {
      resolve(files);
    });
  });
}

async function bundle(inputPath) {
  const relativePath = path.relative(buildDir, inputPath);

  // lodash files come first, so print only on those
  const lodashIndex = relativePath.indexOf('.lodash.js');
  if (lodashIndex > 0) {
    console.log(relativePath.substr(0, lodashIndex));
  }

  rollupConfig.input = inputPath;
  const dest = path.join(bundleDir, relativePath);
  const bundle = await rollup.rollup(rollupConfig);
  await bundle.write({
    file: dest,
    format: 'iife',
    sourcemap: true,
    name: 'thisIsIgnoredButRequired',
  });
  return dest;
}

function explore(file) {
  const basePath = file.substring(0, file.length - 2);
  // fs.writeFileSync(basePath + 'html', generate('html'));

  let lodash = 0;
  let microdash = 0;
  forEach(JSON.parse(generate('json')), (bytes, path) => {
    if (path.includes('lodash')) {
      lodash += bytes;
    } else if (path.includes('micro-dash')) {
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
  fs.writeFileSync(basePath + 'txt', summary);

  function generate(format) {
    return childProcess.spawnSync(
      process.execPath, [sourceMapExplorer, file, '--' + format]
    ).stdout;
  }
}

// Recursively create a dir.
function recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
