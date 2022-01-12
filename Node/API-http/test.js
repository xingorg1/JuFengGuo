const http = require('http');

// 创建本地服务器来从其接收数据
const server = http.createServer((request, response) => {
  console.log(request);
  // 设置响应头，当同时使用了response.setHeader() 和 response.writeHead() 时，所有设置会被合并到一起，且 response.writeHead() 的设置优先。
  response.writeHead(200, {
    'Content-Type': 'application/json'
  });
  console.log(123);
  response.end(JSON.stringify({
    data: 'Hello World!'
  }));
});
console.log(123);
server.listen(8000);


const http = require('http');
let fileData = '';
http.createServer((request, response) => {
  request
    .on('error', (err) => {
      console.error(err);
    })
    .on('data', (chunk) => {
      fileData += data;
    })
    .on('end', () => {
      console.log(fileData);
    });
}).listen(8080);