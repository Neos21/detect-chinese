/*!
 * Unihan_Readings.txt から
 * 「日本語で使用する漢字」と「中国語でのみ使用する漢字」の
 * Unicode Code Point を取得するスクリプト
 * 
 * 予め Unihan データベースファイルをダウンロード・展開しておくこと
 */

const fs   = require('fs');
const path = require('path');

// Input
const unihanReadingsFilePath = path.resolve(__dirname, '../unihan/Unihan_Readings.txt');
// Output
const extractCodePointsJapaneseFilePath = path.resolve(__dirname, './extract-code-points-japanese.txt');
const extractCodePointsChineseFilePath  = path.resolve(__dirname, './extract-code-points-chinese.txt' );

console.log(new Date().toISOString(), 'Start');

// ファイルを読み込む
const unihanReadings = fs.readFileSync(unihanReadingsFilePath, 'utf-8');
console.log(new Date().toISOString(), 'File Loaded');
// コメント行を除いて行分割する
const unihanReadingsLines = unihanReadings.split('\n').filter((line) => !line.startsWith('#'));
console.log(new Date().toISOString(), `Text Splited : ${unihanReadingsLines.length} Lines`);

// Unicode Code Point を控える配列
const japaneseKun = [];  // 日本語訓読み
const japaneseOn  = [];  // 日本語音読み
const mandarin    = [];  // 北京語読み
const cantonese   = [];  // 広東語読み

// 1行ごとに内容を確認し配列に格納していく
unihanReadingsLines.forEach((line) => {
  const columns = line.split('\t');
  const codePoint = columns[0];
  const fieldName = columns[1];
  if(fieldName === 'kJapaneseKun') japaneseKun.push(codePoint.replace('U+', '\\u'));
  if(fieldName === 'kJapaneseOn' ) japaneseOn .push(codePoint.replace('U+', '\\u'));
  if(fieldName === 'kMandarin'   ) mandarin   .push(codePoint.replace('U+', '\\u'));
  if(fieldName === 'kCantonese'  ) cantonese  .push(codePoint.replace('U+', '\\u'));
  // TODO : 特定した Code Point について Unihan_Variants.txt の kSpoofingVariant として異体が定義されていれば
  //        その異体字も一覧に追加するべきだろうか？ ('吉' は Unihan_Readings.txt に登場するが '𠮷' は登場せず特定できない問題がある)
});
console.log(new Date().toISOString(), 'Array Created');
console.log(new Date().toISOString(), `  Japanese Kun : ${japaneseKun.length}`);
console.log(new Date().toISOString(), `  Japanese On  : ${japaneseOn .length}`);
console.log(new Date().toISOString(), `  Mandarin     : ${mandarin   .length}`);
console.log(new Date().toISOString(), `  Cantonese    : ${cantonese  .length}`);

// 日本語訓読みと日本語音読み、北京語読みと広東語読みのペアで重複する Unicode Code Point は一つにする
const japanese = Array.from(new Set([...japaneseKun, ...japaneseOn]));
const chinese  = Array.from(new Set([...mandarin   , ...cantonese ]));
console.log(new Date().toISOString(), 'Duplicates Removed');
console.log(new Date().toISOString(), `  Japanese : ${japaneseKun.length + japaneseOn.length} => ${japanese.length}`);
console.log(new Date().toISOString(), `  Chinese  : ${mandarin   .length + cantonese .length} => ${chinese .length}`);

// ファイルに書き込む : `[\u0000\u1111]` といった形式にする
fs.writeFileSync(extractCodePointsJapaneseFilePath, `[${japanese.join('')}]`, 'utf-8');
fs.writeFileSync(extractCodePointsChineseFilePath , `[${chinese .join('')}]`, 'utf-8');

console.log(new Date().toISOString(), 'Finished');
