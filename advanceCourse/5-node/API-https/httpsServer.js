// 创建https服务器
const https = require('https') // 引入https模块
const url = require('url')
const fs = require('fs')
const path = require('path')

// 配置私钥和证书即可
const serverKey = fs.readFileSync(path.resolve(__dirname, './server-key.pem')) // 服务器私钥
const serverCert = fs.readFileSync(path.resolve(__dirname, './server-cert.crt')) // 服务器CA证书
const Server = https.createServer({ // 创建https服务器
  key: serverKey,
  cert: serverCert
}, (IncomingMessage, serverResponse) => {
  const urlObj = url.parse(IncomingMessage.url)
  console.log(urlObj);
  let body = ''
  IncomingMessage.on('data', chunk => {
    console.log(chunk);
    body += chunk
  })
  IncomingMessage.on('end', () => {
    console.log('end');
  })

  // 响应
  serverResponse.setHeader('a', 1)
  serverResponse.setHeader('Content-type', 'text/html')
  const responseBody = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTTPS服务器</title>
  </head>
  <body>
    <h1 style="color: red">hello HTTPS！</h1>
  </body>
  </html>`
  serverResponse.write(Buffer.from(responseBody, 'utf-8'))
  serverResponse.end()
})

Server.listen(443, () => {
  console.log('server.listen……', `浏览器输入地址 https://localhost:443/abc?a=1 访问`);
})

