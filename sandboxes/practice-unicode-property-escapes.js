/*!
 * ES2018 で追加された Unicode Property Escapes の練習
 */

// ひらがなを含んでいる
console.log((/\p{Script=Hiragana}/u).test('あいうえおカキクケコ'));  // true
console.log((/\p{sc=Hira}/u).test('あいうえおカキクケコ'));          // 上の省略記法

// カタカナを含んでいる
console.log((/\p{Script=Katakana}/u).test('アイウエオ㍑㍍'));  // true
console.log((/\p{sc=Kana}/u).test('アイウエオ㍑㍍'));

// 漢字を含んでいる
console.log((/\p{Script=Hani}/u).test('𠮷野家吉'));  // true
console.log((/\p{sc=Han}/u).test('𠮷野家吉'));

// 漢字以外の文字なので false になる
console.log((/\p{Script=Hani}/u).test('㍻㍼'));  // false
console.log((/\p{sc=Han}/u).test('㍻㍼'));

// 漢字っぽい文字も対象にする
console.log((/\p{Script_Extensions=Hani}/u).test('㍻㍼'));  // true
console.log((/\p{scx=Han}/u).test('㍻㍼'));

const chinese1 = '我开动了, 多谢款待';
const chinese2 = '简体字';

const hangul = '한글 조선글';
const cyrillic = 'русский язык';
const arabic = 'اللغة العربية';

console.log(chinese1, (/\p{sc=Han}/u).test(chinese1));
console.log(chinese1, (/\p{scx=Han}/u).test(chinese1));
console.log(chinese2, (/\p{sc=Han}/u).test(chinese2));
console.log(chinese2, (/\p{scx=Han}/u).test(chinese2));
console.log(hangul  , (/\p{scx=Han}/u).test(hangul  ));
console.log(cyrillic, (/\p{scx=Han}/u).test(cyrillic));
console.log(arabic  , (/\p{scx=Han}/u).test(arabic  ));

console.log('ハングル');
console.log((/\p{Script=Hangul}/u).test(hangul));
console.log((/\p{sc=Hang}/u).test(hangul));
console.log((/\p{Script_Extensions=Hangul}/u).test(hangul));
console.log((/\p{scx=Hang}/u).test(hangul));

console.log('キリル文字');
console.log((/\p{Script=Cyrillic}/u).test(cyrillic));
console.log((/\p{sc=Cyrl}/u).test(cyrillic));
console.log((/\p{Script_Extensions=Cyrillic}/u).test(cyrillic));
console.log((/\p{scx=Cyrl}/u).test(cyrillic));

console.log('アラビア文字');
console.log((/\p{Script=Arabic}/u).test(arabic));
console.log((/\p{sc=Arab}/u).test(arabic));
console.log((/\p{Script_Extensions=Arabic}/u).test(arabic));
console.log((/\p{scx=Arab}/u).test(arabic));
