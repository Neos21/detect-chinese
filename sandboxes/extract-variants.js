/*!
 * Unihan_Variants.txt のうち kSpoofingVariant (スプーフィング異体) を
 * 抽出・整形出力するスクリプト
 * 
 * '𠮷' が Unihan_Readings.txt に登場しないため
 * Unihan_Variants.txt の内容も参照すべきかと思い
 * 内容確認のため作成したスクリプト
 */

const fs   = require('fs');
const path = require('path');

// Input
const unihanVariantsFilePath = path.resolve(__dirname, '../unihan/Unihan_Variants.txt');
// Output
const extractVariantsFilePath = path.resolve(__dirname, './extract-variants.txt');

console.log(new Date().toISOString(), 'Start');

// ファイルを読み込む
const variants = fs.readFileSync(unihanVariantsFilePath, 'utf-8');
console.log(new Date().toISOString(), 'File Loaded');
// コメント行を除外し kSpoofingVariant を含む行のみ抽出して配列にする
const spoofingLines = variants.split('\n').filter((line) => !line.startsWith('#') && line.includes('kSpoofingVariant'));
console.log(new Date().toISOString(), `Text Splited : ${spoofingLines.length} Lines`);

// 1行ずつ整形していく
const text = spoofingLines
  .map((line) => {
    const columns = line.split('\t');
    const fromCodePoint = columns[0].replace('U+', '\\u');
    const toCodePoints  = columns[2].replace((/U\+/g), '\\u');  // スペース区切りで複数ある場合がある
    
    const fromCharacter = String.fromCodePoint(fromCodePoint.replace('\\u', '0x'));
    const lines = toCodePoints
      .split(' ')
      .map((toCodePoint) => {
        const toCharacter = String.fromCodePoint(toCodePoint.replace('\\u', '0x'));
        const lineText = `[${fromCharacter}] ${fromCodePoint}  --->  [${toCharacter}] ${toCodePoint}`;
        console.log(new Date().toISOString(), lineText);
        return lineText;
      })
      .join('\n');
    return lines;
  })
  .join('\n');
// TODO : From・To の組合せが逆の行も存在するのでそれらは除外したい
console.log(new Date().toISOString(), 'Text Created');

fs.writeFileSync(extractVariantsFilePath, text, 'utf-8');

console.log(new Date().toISOString(), 'Finished');
