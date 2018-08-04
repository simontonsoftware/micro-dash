import { writeFileSync } from 'fs';
import { format } from 'prettier';

const packageJson = require('./package.json');
const libPackageJson = require('./projects/ng-app-state/package.json');
writeFileSync(
  './projects/ng-app-state/package.json',
  format(JSON.stringify({ ...libPackageJson, version: packageJson.version }), {
    parser: 'json',
  }),
);
