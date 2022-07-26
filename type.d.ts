/** `detect()` 関数の結果オブジェクト */
interface DetectResult {
  /** 判定結果言語 (cn:中国語・ja:日本語・OTHER:その他言語・NONE:空文字) */
  language: 'cn' | 'ja' | 'OTHER' | 'NONE';
  /** 元の文字列 */
  text: string;
  /** 日本語と判定した文字列の配列 */
  japaneseCharacters: Array<string>;
  /** 中国語と判定した文字列の配列 */
  chineseCharacters: Array<string>;
  /** それ以外の言語の文字列の配列 */
  otherCharacters: Array<string>;
}

/**
 * 文字列が中国語かどうか判定する
 * 
 * @param text 文字列
 * @return 結果オブジェクト
 */
export function detect(text: string): DetectResult;

/** ひらがな・カタカナおよびそれに関する文字の正規表現 */
export const regExpHiraKanaUnicodeCodePoints: RegExp;
/** 日本語訓読みもしくは日本語音読みがある漢字の Unicode Code Point を列挙した正規表現 */
export const regExpJapaneseUnicodeCodePoints: RegExp;
/** 北京語もしくは広東語の読みがある漢字の Unicode Code Point を列挙した正規表現 */
export const regExpChineseUnicodeCodePoints: RegExp;
