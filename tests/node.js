/** Node.js での利用サンプル・兼・動作テスト */

const detectChinese = require('../index');

const patterns = [
  { value: '哈罗'                   , expected: 'cn'    },
  { value: 'こんにちは'             , expected: 'ja'    },
  { value: 'Hello'                  , expected: 'OTHER' },
  { value: 'こんにちは。Hello. 哈罗', expected: 'cn'    },
  { value: 'こんにちは。Hello.'     , expected: 'ja'    },
  { value: '𣏾'                     , expected: 'ja'    },
  { value: '𠀼'                     , expected: 'cn'    },
  { value: ''                       , expected: 'NONE'  },
  { value: null                     , expected: 'Error: The Argument Is Null'         },
  { value: 1                        , expected: 'Error: The Argument Is Not A String' }
];

let total  = 0;
let passed = 0;
let failed = 0;

patterns.forEach((pattern, index) => {
  total++;
  
  let detected = null;
  try {
    detected = detectChinese.detect(pattern.value);
  }
  catch(error) {
    console.log(`${index + 1}. [${pattern.value}] --> Throws Error : [${error}]`);
    if(pattern.expected === error.toString()) {
      console.log('   --> OK');
      passed++;
    }
    else {
      console.error('   !!! NG !!!');
      failed++;
    }
    console.log('');
    return;
  }
  
  console.log(`${index + 1}. [${pattern.value}] --> [${detected.language}]`);
  console.log(`   ${JSON.stringify(detected)}`);
  if(pattern.expected === detected.language) {
    console.log('   --> OK');
    passed++;
  }
  else {
    console.error('   !!! NG !!!');
    failed++;
  }
  console.log('');
});

console.log(`Total  : [${total}]`);
console.log(`Passed : [${passed}]`);
console.log(`Failed : [${failed}]`);
console.log('');
if(failed > 0) {
  console.error('The Test Is Failed.');
}
else {
  console.log('All Tests Are Passed.');
}
