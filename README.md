# Cognito With Third Party - Frontend

[Cognito With Third Party](https://github.com/raikiri-jp/cognito-with-third-party) は Amazon Cognito をサードパーティのサーバーから利用する Webアプリケーションのサンプルプロジェクトです。

サンプルプロジェクトでは Backend に Laravel、Frontend に Angular を採用してしています。

Backend の起動方法は [Cognito With Third Party](https://github.com/raikiri-jp/cognito-with-third-party) を参照してください。

## ビルド手順

1. [Cognito With Third Party](https://github.com/raikiri-jp/cognito-with-third-party) をインストールします。

2. [Cognito With Third Party](https://github.com/raikiri-jp/cognito-with-third-party) の `src/frontend` (当アプリケーションのルートディレクトリ) に移動して、次のコマンドを実行します。

   ```
   ng build
   ```

   コマンドを実行すると Backend の `public` ディレクトリにファイルが出力されます。

   Frontend の変更を検知して自動でビルドを行うには、次のコマンドを実行します。

   ```
   ng build --watch
   ```

## アプリケーションの起動方法

アプリケーションの起動方法については [Cognito With Third Party](https://github.com/raikiri-jp/cognito-with-third-party) を参照してください。

## License

[MIT license](https://opensource.org/licenses/MIT)
