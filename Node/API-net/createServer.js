const net = require('net');

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('client connected');
});

server.on('error', (err) => {
  // throw err;
  console.log(err);
});

server.listen(80, () => {
  console.log('server bound: http://localhost:80');
});

// 开启监听，用来做提示信息、日志记录等
server.on('listening', (data) => {
  console.log('listening', data);
});
// 有客户端连接到服务器了
server.on('connection', (socket) => {
  console.log('connection');
  // console.log( socket);
    socket.on('data', chunk => {
      // console.log('socket data = ', chunk.toString('utf-8')); // 得到请求体
      // 写入内容，返回响应信息
      socket.write(`HTTP/1.1 200 OK
Connection: keep-alive
Content-Type: text/html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1>你好!</h1>
</body>
</html>`) // 响应内容要符合http协议
    socket.end() // 服务器主动断开
  })
  socket.on('end', data => {
    console.log('end', data);
  })
});

