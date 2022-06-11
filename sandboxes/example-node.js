/*!
 * 作成したライブラリを Node.js から require() して使ってみる
 */

const detectChinese = require('../index');

/** テストしたい文字列 */
const patterns = [
  { name: '日本語でよく使う文字列', value: 'あいうえおー、アイウエオ～。ｶｷｸｹｺ！？ﾊﾞﾋﾞﾌﾞﾍﾞﾎﾞ!?ﾊﾟﾋﾟﾌﾟﾍﾟﾎﾟ・，．,.' },
  { name: '日本語で使う漢字'      , value: '𠮷野家吉㍑㍍㍻㍼感謝億劫' },  // TODO : 既知の問題 : `𠮷` が漢字として判定されない
  { name: '中国語の文章'          , value: '我开动了, 多谢款待 简体字' },
  { name: 'ハングル'              , value: '한글 조선글' },
  { name: 'キリル文字'            , value: 'русский язык' },
  { name: 'アラビア文字'          , value: 'اللغة العربية' },
  { name: '空文字'                , value: '' }
];

console.log(new Date().toISOString(), 'Start');
console.log('');

patterns.forEach((pattern) => {
  const detected = detectChinese.detect(pattern.value);
  console.log(`- ${pattern.name} : [${pattern.value}] --> ${detected.language}`);
  console.log(detected);
  console.log('');
});

console.log(new Date().toISOString(), 'Finished');
