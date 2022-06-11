# Detect Chinese : SandBoxes

メモや既知の問題などの情報まとめ。


## 既知の問題

### つちよし `𠮷` が日本語漢字とも中国語漢字ともみなされず、その他の文字扱いになってしまっている

- 原因 : `Unihan_Readings.txt` には `𠮷` に対する読み方の定義がないため。`𠮷` は `吉` のスプーフィング異体として `Unihan_Variants.txt` の定義に出てくるのみ
- 対応案 : `scripts/extract-code-points.js` で `Unihan_Readings.txt` を1文字ずつチェックする際、その文字の異体が `Unihan_Variants.txt` 内に `kSpoofingVariant` として定義されていれば、その異体も追加するようにする
    - コレにより、`Unihan_Readings.txt` より `吉` を「日本語で使う漢字」として特定 → `Unihan_Variants.txt` に異体として定義されている `𠮷` を引っ張ってきてそれも「日本語で使う漢字」として追加する、という処理は作れる
    - ただし、`𠮷` 以外の漢字の異体についても同様に考えられるのかどうかが分からない
- 参考文献
    - http://unicode.org/cgi-bin/GetUnihanData.pl?codepoint=20bb7
    - http://www.asahi-net.or.jp/~ax2s-kmtn/ref/unicode/cjkeu_note.html
- `吉` : `\u{5409}`
- `𠮷` : `\u{20bb7}` (JS 内部の UTF-16 だと `\u{d842}\u{dfb7}` の2つで構成される)


## メモ

### Unihan で「中国語」を判定する

- Unicode では、「漢字」は CJK で区別なくまぜこぜに定義されているため、ハングルやキリル文字のように簡単な Unicode Code Point や Unicode Property Escapes では特定できない
    - Unicode Propertye Escapes として `\p{Han}` (JS では `\p{Script=Hani}` ないしは `\p{sc=Han}`) が使えるようになったが、コレは「漢字全般」に該当してしまい、日本語と中国語を区別できない
- そこで、Unihan というデータベースのファイルを利用し、「日本語で使用される漢字」と「中国語でのみ使用される漢字」とを区別することで「その文字列が中国語であるか」を判定しようと試みる
    - 日本語で使用される漢字 : Unihan データベースにおいて「日本語の音読み」「日本語の訓読み」の定義が存在する漢字
    - 中国語でのみ使用される漢字 : 「北京語読み」「広東語読み」の定義が存在する漢字
    - これらの情報は `Unihan_Readings.txt` より抽出できる。その抽出処理をまとめたのが `./scripts/extract-code-points.js` である
- 参考文献
    - https://qiita.com/Saqoosha/items/927e9d6e77922ad9f08a
    - https://shinya131-note.hatenablog.jp/entry/2015/07/10/004853

### ES2018 で追加された Unicode Property Escapes という機能

- https://yutapon.hatenablog.com/entry/unicode-property-escapes-in-regexp
    - 概要
- https://tc39.es/proposal-regexp-unicode-property-escapes/#table-binary-unicode-properties
    - RegExp で指定できるモノ一覧
- https://qiita.com/BlueSilverCat/items/dcea3121c7af83148f29
    - それぞれの Unicode Code Point
- https://github.com/anton-bot/contains-chinese
    - 他言語における `\p{Han}` 相当の Unicode Code Point のフォールバック
    - `const HAN_REGEX = /[\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u3005\u3007\u3021-\u3029\u3038-\u303B\u3400-\u4DB5\u4E00-\u9FD5\uF900-\uFA6D\uFA70-\uFAD9]/;`
- 他言語における UPE の話
    - PHP の場合
        - `\p{Han}` という Unicode プロパティで漢字全般を特定できる。コレは日本語で使用される漢字、中国語で使用される漢字を区別しない
        - https://stabucky.com/wp/archives/7598
    - Ruby の場合
        - PHP と同様に `\p{Han}` が存在する。仕様も同じ
        - https://qiita.com/Takayuki_Nakano/items/8d38beaddb84b488d683
