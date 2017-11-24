'use strict';

const fs = require('fs');
const path = require('path');
const glob = require('glob');
const camelCase = require('camelcase');
const rollup = require('rollup');
const uglify = require('rollup-plugin-uglify');
const sourcemaps = require('rollup-plugin-sourcemaps');
const nodeResolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');

const libName = require('../package.json').name;
const rootFolder = path.join(__dirname, '..');
const libFolder = path.join(rootFolder, 'lib')
const buildFolder = path.join(libFolder, 'build');
const distFolder = path.join(rootFolder, 'dist');
const es5Folder = path.join(buildFolder, 'es5');
const es2015Folder = path.join(buildFolder, 'es2015');

return Promise.resolve()
  .then(() => {
    // Base configuration.
    const es5Entry = path.join(es5Folder, 'index.js');
    const es2015Entry = path.join(es2015Folder, 'index.js');
    const rollupBaseConfig = {
      moduleName: camelCase(libName),
      sourceMap: true,
      plugins: [
        commonjs(),
        sourcemaps(),
        nodeResolve({jsnext: true, module: true})
      ]
    };

    // UMD bundle.
    const umdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.js`),
      format: 'umd',
    });

    // Minified UMD bundle.
    const minifiedUmdConfig = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `bundles`, `${libName}.umd.min.js`),
      format: 'umd',
      plugins: rollupBaseConfig.plugins.concat([uglify({})])
    });

    // ESM+ES5 flat module bundle.
    const fesm5config = Object.assign({}, rollupBaseConfig, {
      entry: es5Entry,
      dest: path.join(distFolder, `${libName}.es5.js`),
      format: 'es'
    });

    // ESM+ES2015 flat module bundle.
    const fesm2015config = Object.assign({}, rollupBaseConfig, {
      entry: es2015Entry,
      dest: path.join(distFolder, `${libName}.js`),
      format: 'es'
    });

    const allBundles = [
      umdConfig,
      minifiedUmdConfig,
      fesm5config,
      fesm2015config
    ].map(cfg => rollup.rollup(cfg).then(bundle => bundle.write(cfg)));

    return Promise.all(allBundles)
      .then(() => console.log('All bundles generated successfully.'))
  })
  // Copy typings
  .then(() => _relativeCopy('**/*.d.ts', es2015Folder, distFolder))
  // Copy package files
  .then(() => Promise.resolve()
    .then(() => _relativeCopy('LICENSE', rootFolder, distFolder))
    .then(() => _relativeCopy('package.json', rootFolder, distFolder))
    .then(() => _relativeCopy('README.md', rootFolder, distFolder))
    .then(() => console.log('Package files copy succeeded.'))
  )
  .catch(e => {
    console.error('Build failed. See below for errors.\n');
    console.error(e);
    process.exit(1);
  });


// Copy files maintaining relative paths.
function _relativeCopy(fileGlob, from, to) {
  return new Promise((resolve, reject) => {
    glob(fileGlob, {cwd: from, nodir: true}, (err, files) => {
      if (err) reject(err);
      files.forEach(file => {
        const origin = path.join(from, file);
        const dest = path.join(to, file);
        const data = fs.readFileSync(origin, 'utf-8');
        _recursiveMkDir(path.dirname(dest));
        fs.writeFileSync(dest, data);
        resolve();
      })
    })
  });
}

// Recursively create a dir.
function _recursiveMkDir(dir) {
  if (!fs.existsSync(dir)) {
    _recursiveMkDir(path.dirname(dir));
    fs.mkdirSync(dir);
  }
}
