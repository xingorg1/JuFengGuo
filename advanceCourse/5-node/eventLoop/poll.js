setTimeout(() => {
  console.log('setTimeout');
}, 5000)
console.log('node 生命周期');

const http = require('http')

const server = http.createServer(() => {
  console.log('请求回调');
});

server.listen(8080)
