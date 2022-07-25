#!/usr/bin/env node

/*! CLI 実行用 */

const detectChinese = require('./index');

if(process.argv[2]) {
  console.log(JSON.stringify(detectChinese.detect(process.argv[2]), null, '  '));
}
else {
  console.error('Detect Chinese : Please Input Value');
}
