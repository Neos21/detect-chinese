# **[WIP]** @neos21/detect-chinese : Detect Chinese

**[WIP]** 文字列が「中国語かどうか」を判定する。

- [x] 「中国語っぽい漢字」を判定する
- [ ] 精度を確認・向上するべく色々なテスト文字列で検証したい
    - 現状、つちよし `𠮷` を「日本語で使われる漢字」とも「中国語でのみ使われる漢字」とも判定できない (詳細は [SandBoxes](./sandboxes/README.md) にて)
- [x] コマンドラインツールとして動作するようにする
- [x] API 呼び出しで動作するようにする
- [x] ブラウザ上で動作するようにする
- [ ] npm パッケージとして公開する

```bash
# npm コマンドとしてインストールして実行
$ npm install -g
$ detect-chinese 'テスト文字列'

# Node.js API のサンプル実行
$ node ./sandboxes/example-node.js
```

- ブラウザ (HTML) からのサンプル実行 : `./sandboxes/example-browser.html`


## Links

- [Neo's World](https://neos21.net/)
- [GitHub - Neos21](https://github.com/Neos21/)
- [GitHub - detect-chinese](https://github.com/Neos21/detect-chinese)
