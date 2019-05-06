const {
  exec,
} = require('child_process');
const {
  remove,
  readFile,
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

module.exports = async function InkWebpackLoader(source) {
  const options = getOptions(this) || {};
  validateOptions(schema, options, 'Ink Webpack Loader');

  await new Promise((resolve) => {
    const task = exec(`${inklecate} -o ${tempFile} ${this.resourcePath}`);
    task.on('message', console.log.bind(console));
    task.on('error', console.error.bind(console));
    task.on('exit', resolve);
  });

  const file = await readFile(tempFile);
  await remove(tempFile);

  return `export const storyContent = ${file};\n` +
    `export const text = ${JSON.stringify(source.trim())};\n`;
};
