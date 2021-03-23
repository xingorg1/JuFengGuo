# 生成证书的流程

## 安装openssl
https://github.com/openssl/openssl

*mac自带*

## 网站根目录下按顺序输入下列命令：
*基于openssl的命令*

### 生成CA私钥 [牢记密码]
```sh
openssl genrsa -des3 -out ca-pri-key.pem 1024
```
### 生成CA公钥（证书请求）
```sh
openssl req -new -key ca-pri-key.pem -out ca-pub-key.pem
```
### 生成CA证书
```sh
openssl x509 -req -in ca-pub-key.pem -signkey ca-pri-key.pem -out ca-cert.crt
```
### 生成服务器私钥
```sh
openssl genrsa -out server-key.pem 1024
```
### 生成服务器公钥
```sh
openssl req -new -key server-key.pem -out server-scr.pem
```
### 生成服务器证书
```sh
openssl x509 -req -CA ca-cert.crt -CAkey ca-pri-key.pem -CAcreateserial -in server-scr.pem -out server-cert.crt
```
