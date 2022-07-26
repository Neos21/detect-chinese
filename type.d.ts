interface detectResult {
  language: 'cn' | 'ja' | 'OTHER' | 'NONE'
  text: string
  japaneseCharacters: string
  chineseCharacters: string
  otherCharacters: string
}
export function detect(text: string): detectResult

export const regExpHiraKanaUnicodeCodePoints: RegExp

export const regExpJapaneseUnicodeCodePoints: RegExp
export const regExpChineseUnicodeCodePoints: RegExp
