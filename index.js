'use strict';

const jetpack = require('fs-jetpack');
const writeJson = require('write-json-file');
const camelCase = require('camelcase');
const log = require('single-line-log').stdout

const arrayFields = ['to', 'cc', 'bcc'];

function textToJson(text) {
  const lines = text.replace(/\r/g, ' ')
    .replace(/\n^\t/mg, '').split('\n');
  const object = {};
  while(lines.length) {
    let line = lines.shift();
    if(/^\s+$/.test(line)) {
      break;
    }
    let idx = line.indexOf(': ');
    let fieldName = camelCase(line.substr(0, idx));
    let value = line.substr(idx + 2).trim();
    if(arrayFields.indexOf(fieldName) > -1) {
      object[fieldName] = value.split(/,\s+/g);
    } else {
      object[fieldName] = value.trim();
    }
  }

  object.body = lines.join('\n');

  return object;
}

const files = jetpack.find('./maildir', { matching: '**/*\.' });

console.log(`Preparing to convert ${files.length} files`);
let length = files.length;
let successes = 0;

files.forEach((path) => {
  const file = jetpack.read(path);
  const json = textToJson(file);

  let pathComponents = path.split('/');
  let filename = pathComponents.pop() + 'json';
  writeJson.sync(pathComponents.join('/') + '/' + filename, json)
  jetpack.remove(path);
  successes++;
  log(`Converted ${(successes/length*100).toFixed(2)}%`);
});
