# Masher

## ローカル環境構築について

本番環境以外ではIPによるアクセス制限を行っています。  
[IPinfo.io]('https://ipinfo.io)からIPを取得する関係上、ローカル環境のSSL化を行っています。  
その為、ローカル環境構築時に以下の対応をお願いいたします。

### hostsに追加

```
sudo vi /private/etc/hosts
```

以下を追記

```
127.0.0.1 local.masher.app
```

### OpenSSLで自己証明書作成

- 秘密鍵を作成

```
openssl genrsa -aes128 2048 > server.key
```

- 証明書署名要求(CSR)を作成

```
openssl req -new -key server.key -out server.csr
```

- パスフレーズ解除

```
cp server.key server.key.org
openssl rsa -in server.key.org -out server.key
```

- 自己証明書(CRT)を作成

```
openssl x509 -days 3650 -req -signkey server.key < server.csr > server.crt -extfile san.ext
```

※参考  
- https://portaltan.hatenablog.com/entry/2017/10/12/134120
- https://portaltan.hatenablog.com/entry/2017/10/16/174619
- https://qiita.com/kawasukeeee/items/81a71cb55db87cdbba4d