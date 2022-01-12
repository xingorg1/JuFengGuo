// 创建服务器
const http = require('http')
const url = require('url')

const Server = http.createServer({
}, (IncomingMessage, serverResponse) => {
  console.log('监听到一个请求req：', IncomingMessage); //  Specifies the IncomingMessage class to be used. Useful for extending the original IncomingMessage https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_incomingmessage
  // console.log('我发出的响应res：', serverResponse); // Specifies the ServerResponse class to be used. Useful for extending the original ServerResponse https://nodejs.org/dist/latest-v14.x/docs/api/http.html#http_class_http_serverresponse

  // 获取并处理请求信息
  console.log(IncomingMessage.method);
  console.log(IncomingMessage.headers);
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
  // serverResponse.statusCode = 404;
  serverResponse.setHeader('a', 1)
  serverResponse.setHeader('Content-type', 'text/html')
  const responseBody = `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1 style="color: red">hello http！</h1>
  </body>
  </html>`
  serverResponse.write(Buffer.from(responseBody, 'utf-8'))
  serverResponse.end()
})

// console.log(Server);

Server.listen(1993, () => {
  console.log('server.listen……', `浏览器输入地址 http://localhost:1993/abc?a=1 访问`);
})

