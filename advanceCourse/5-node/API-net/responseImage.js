const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './head.jpeg')
const net = require('net');

const server = net.createServer((c) => {
});

server.on('error', (err) => {
  console.log(err);
});

server.listen(80, () => {
  console.log('server bound: http://localhost:80');
});

server.on('connection', (socket) => {
  console.log('connection');
  socket.on('data', async chunk => {
    const headerBuffer = Buffer.from(`HTTP/1.1 200 OK
Content-Type: image/jpeg

`, 'utf-8');
    const imgBuffer = await fs.promises.readFile(fileName)
    // 返回图片
    const responseBuffer = Buffer.concat([headerBuffer, imgBuffer])
    socket.write(responseBuffer) // 响应内容要符合http协议
    socket.end() // 服务器主动断开
  })
  socket.on('end', data => {
    console.log('end', data);
  })
});

