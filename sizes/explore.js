const fs = require('fs');
const path = require('path');
const glob = require('glob');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const childProcess = require('child_process');

const forEach = require('micro-dash').forEach;

const buildDir = path.join(__dirname, 'build/');
const bundleDir = path.join(__dirname, 'bundle/');
const sourceMapExplorer = path.join(
  __dirname, 'node_modules', 'source-map-explorer', 'index.js'
);
const rollupConfig = {
  onwarn: function (warning) {
    // Skip certain warnings
    if (warning.code === 'THIS_IS_UNDEFINED') {
      return;
    }
    // console.warn everything else
    console.warn(warning.message);
  },
  plugins: [
    nodeResolve({jsnext: true, module: true}),
    commonjs(),
    uglify()
  ]
};

return Promise.resolve()
  .then(() => _recursiveMkDir(bundleDir))
  .then(() => {
    let queue = Promise.resolve();
    glob(
      path.join(buildDir, '**/*.js'),
      {nodir: true},
      (err, files) => {
        for (const inFile of files) {
          queue = queue.then(() => bundle(inFile)).then(explore);
        }
      }
    );
    return queue;
  });

function bundle(entry) {
  const relPath = path.relative(buildDir, entry);
  console.log(relPath);
  rollupConfig.entry = entry;
  const dest = path.join(bundleDir, relPath);
  return Promise.resolve()
  // Bundle app.
    .then(() => rollup.rollup(rollupConfig))
    // Write to file.
    .then(bundle =>
      bundle.write({dest: dest, format: 'iife', sourceMap: true})
    )
    .then(() => dest);
}

function explore(file) {
  const basePath = file.substring(0, file.length - 2);
  fs.writeFileSync(basePath + 'html', generate('html'));

  let lodash = 0;
  let microdash = 0;
  forEach(JSON.parse(generate('json')), (bytes, path) => {
    if (path.includes('lodash')) {
      lodash += bytes;
    } else if (path.includes('micro-dash')) {
      microdash += bytes;
    }
  });
  let summary =
    ` * - Lodash: ${lodash.toLocaleString()} bytes`
    + `\n * - Micro-dash: ${microdash.toLocaleString()} bytes`;
  console.log(summary);
  fs.writeFileSync(basePath + 'txt', summary);

  function generate(format) {
    return childProcess.spawnSync(
      process.execPath, [sourceMapExplorer, file, '--' + format]
    ).stdout;
  }
}


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return glob(fileGlob, {cwd: from, nodir: true}, (err, files) => {
    if (err) throw err;
    files.forEach(file => {
      const origin = path.join(from, file);
      const dest = path.join(to, file);
      _recursiveMkDir(path.dirname(dest));
      fs.createReadStream(origin).pipe(fs.createWriteStream(dest));
    })
  })
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
