import { execSync } from 'child_process';
import * as fs from 'fs';
import { writeFileSync } from 'fs';
import * as glob from 'glob';
import * as path from 'path';
import * as readline from 'readline';
import { explore } from 'source-map-explorer';
import { FileData } from 'source-map-explorer/dist/types';
import { forEach } from '../micro-dash/src/lib/collection';
import { ObjectWith } from '../micro-dash/src/lib/interfaces';

const appDir = path.join(__dirname, 'src', 'app');
const mainDir = path.join(__dirname, 'src');
const rootDir = path.join(__dirname, '..', '..');
const bundleDir = path.join(rootDir, 'dist', 'calc-sizes');
const sourceDir = path.join(rootDir, 'projects', 'micro-dash', 'src', 'lib');

run();

async function run(): Promise<void> {
  while (true) {
    const input = await getInput(
      'Filename base (e.g. "map-values"), or "all" for all: ',
    );

    if (input === 'all') {
      await buildAndExplore(`**/*.ts`);
    } else {
      await buildAndExplore(`**/${input}.*.ts`);
    }
  }
}

function getInput(text: string): Promise<string> {
  return new Promise<string>((resolve) => {
    const reader = readline.createInterface(process.stdin, process.stdout);
    reader.question(text, (answer) => {
      resolve(answer);
      reader.close();
    });
  });
}

async function buildAndExplore(fileGlob: string): Promise<void> {
  const inputPaths = await getPaths(fileGlob);
  for (const inputPath of inputPaths) {
    await build(inputPath);
    const summary = await inspect();
    if (summary) {
      updateComment(inputPath, summary);
    }
  }
}

function getPaths(fileGlob: string): Promise<string[]> {
  return new Promise<string[]>((resolve) => {
    glob(path.join(appDir, fileGlob), { nodir: true }, (_err, files) => {
      resolve(files);
    });
  });
}

async function build(inputPath: string): Promise<void> {
  const importFile = path.relative(mainDir, inputPath);
  const importPath = './' + importFile.replace(/\\/g, '/').replace('.ts', '');

  // lodash files come first, so print only on those
  const lodashIndex = importPath.indexOf('.lodash');
  if (lodashIndex > 0) {
    console.log(importPath.substr(0, lodashIndex));
  }

  writeFileSync(path.join(mainDir, 'main.ts'), `import "${importPath}";`);
  execSync('ng build --prod --sourceMap=true calc-sizes', { cwd: rootDir });
}

async function inspect(): Promise<string> {
  const res = await explore(path.join(bundleDir, 'main.*.js'));
  const files: ObjectWith<FileData> = res.bundles[0].files;

  let lodash = 0;
  let microdash = 0;
  forEach(files, ({ size }, sourceFile) => {
    if (sourceFile.includes('lodash')) {
      lodash += size;
    } else if (sourceFile.includes('micro-dash')) {
      microdash += size;
    }
  });
  let summary: string;
  if (lodash > 0) {
    summary = ` * - Lodash: ${lodash.toLocaleString()} bytes`;
  } else if (microdash > 0) {
    summary = ` * - Micro-dash: ${microdash.toLocaleString()} bytes`;
  }
  console.log(summary);
  return summary;
}

function updateComment(inputPath: string, summary: string): void {
  // tslint:disable-next-line:no-non-null-assertion
  const lib = summary.match(/ - (.*):/)![1];

  const relativePath = path.relative(appDir, inputPath);
  const baseName = relativePath.replace(/\.lodash|\.microdash/, '');
  const sourcePath = path.join(sourceDir, baseName);

  let source = fs.readFileSync(sourcePath, 'utf8');
  source = source.replace(new RegExp(` \\* - ${lib}:.*`), summary);
  fs.writeFileSync(sourcePath, source);
}
