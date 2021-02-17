const http = require('http')
const postData = '123'
const ClientRequest = http.request('http://ke.qq.com', {
  // 设置请求头
  method: 'GET',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
}, (IncomingMessage) => {
  console.log(IncomingMessage); // Incoming Message传入消息
  console.log(IncomingMessage.statusCode); // Incoming Message传入消息
  console.log(IncomingMessage.statusMessage);
  console.log(IncomingMessage.headers);
  // 返回的消息体是流的形式，可以一点点读取
  let result = ''
  IncomingMessage.on('data', chunk => {
    console.log('响应流的一部分内容：', chunk);
    result += chunk.toString('utf-8')
  })
  IncomingMessage.on('end', () => {
    console.log('响应体结果：', result);
  })
})
// console.log(ClientRequest);

// Write data to request body
req.write(postData);

ClientRequest.end() // 表示写入完成、消息体结束，底层会组装消息体（MessageBody）、发送请求