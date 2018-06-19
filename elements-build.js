#!/usr/bin/env node

const concat = require('concat-files');
const fs = require('fs');
const Hashids = require('hashids');

const hashids = new Hashids();
const buildHash = hashids.encode(Math.floor(new Date() / 1000));
const outputFileName = `./dist/elements.${buildHash}.js`;
const outputHashFileName = `./dist/hashmap.json`;

// Concat
concat([
  './dist/my-app/runtime.js',
  './dist/my-app/main.js',
  './dist/my-app/polyfills.js'
], outputFileName, function(err) {
  if (err) throw err;
  console.log(`Packed to ${outputFileName}`);

  // Make webpack bundle unique with same hash
  console.log(`Making webpack bundle unique using hash ${buildHash}...`);
  replace(outputFileName, '__webpack_require__', buildHash);
  replace(outputFileName, 'webpackJsonp', buildHash);
});

// Write hash map
fs.writeFileSync(outputHashFileName, JSON.stringify({
  elements: buildHash
}));

console.log(`Created hashmap file ${outputHashFileName}`);

function replace(file, searchString, hash) {
  const content = fs.readFileSync(file, 'utf8');
  const searchRegexp = new RegExp(searchString, 'g');
  const result = content.replace(searchRegexp, searchString + hash);
  fs.writeFileSync(file, result);
}
