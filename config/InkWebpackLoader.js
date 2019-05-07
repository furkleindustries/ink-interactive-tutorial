const {
  execSync,
} = require('child_process');
const {
  removeSync,
  readFileSync,
} = require('fs-extra');
const {
  getOptions,
} = require('loader-utils');
const {
  type,
} = require('os');
const {
  join,
} = require('path');
const validateOptions = require('schema-utils');

const schema = {
  type: 'object',
  properties: {},
};

const inklecateDir = join(__dirname, '..', 'inklecate');
const inklecate = join(inklecateDir, /^windows/i.test(type()) ? 'inklecate.exe' : 'inklecate');
const tempFile = join(inklecateDir, 'temp.json');

module.exports = function InkWebpackLoader(source) {
  const options = getOptions(this) || {};
  validateOptions(schema, options, 'Ink Webpack Loader');

  const output = execSync(`${inklecate} -o ${tempFile} ${this.resourcePath}`);

  const file = readFileSync(tempFile);
  removeSync(tempFile);

  return `export const storyContent = ${file};\n` +
    `export const text = ${JSON.stringify(source.trim())};\n` +
    `export const output = ${JSON.stringify(String(output).trim())};\n`;
};
