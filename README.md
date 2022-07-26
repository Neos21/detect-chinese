# @neos21/detect-chinese : Detect Chinese

[![NPM Version](https://img.shields.io/npm/v/@neos21/detect-chinese.svg)](https://www.npmjs.com/package/@neos21/detect-chinese) [![GPR Version](https://img.shields.io/github/package-json/v/neos21/detect-chinese?label=github)](https://github.com/Neos21/detect-chinese/packages/1557727)

文字列に「中国語にしか使われない漢字が含まれているかどうか」を調べることで、対象の文字列が「中国語かどうか」を判定する。


## Demo

__[Demo (GitHub Pages)](https://neos21.github.io/detect-chinese/)__


## How To Use

### CLI ツールとして使用する

```bash
$ npm install -g @neos21/detect-chinese

$ detect-chinese 'こんにちは。哈罗'
{
  "language": "cn",
  "text": "こんにちは。哈罗",
  "japaneseCharacters": [
    "こ",
    "ん",
    "に",
    "ち",
    "は",
    "。",
    "哈"
  ],
  "chineseCharacters": [
    "罗"
  ],
  "otherCharacters": []
}

$ detect-chinese 'こんにちは。哈罗' | jq -r '.language'
cn
```

文字列のうち `罗` は日本語に存在しない文字である → この文章は中国語が含まれているので `"language": "cn"` (中国語) とみなしている。

### Node.js API として利用する

```bash
$ npm install --save @neos21/detect-chinese
```

```javascript
const detectChinese = require('@neos21/detect-chinese');

const text = 'こんにちは。哈罗';
const detected = detectChinese.detect(text);

console.log('Detected Language : ', detected.language);  // 'cn'

const isIncludesChinese = detected.chineseCharacters.length > 0;  // true
if(isIncludesChinese) {
  console.log('中国語を含んだ文字列です。');  // ←
} else {
  console.log('中国語を含んでいません。');
}
```

### ブラウザで利用する

- [jsDelivr](https://www.jsdelivr.com/package/npm/@neos21/detect-chinese)
- unpkg.org : `https://unpkg.com/browse/@neos21/detect-chinese@【Latest Version】/`
- [GitHub Pages](https://neos21.github.io/detect-chinese/)
    - <https://neos21.github.io/detect-chinese/detect-chinese.js>
- [Raw GitHub](https://github.com/Neos21/detect-chinese)
    - <https://raw.githubusercontent.com/Neos21/detect-chinese/master/index.js>

```html
<!-- JS を読み込みます -->
<script src="index.js"></script>

<script>
  const detected = window.detectChinese.detect('こんにちは。哈罗');
  console.log(detected);
</script>
```


## Links

- [Neo's World](https://neos21.net/)
- [GitHub - Neos21](https://github.com/Neos21/)
- [GitHub - detect-chinese](https://github.com/Neos21/detect-chinese)
- [GitHub Pages - @neos21/detect-chinese : Detect Chinese](https://neos21.github.io/detect-chinese)
- [npm - @neos21/detect-chinese](https://www.npmjs.com/package/@neos21/detect-chinese)
