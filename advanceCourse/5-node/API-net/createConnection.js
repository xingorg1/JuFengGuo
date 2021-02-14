const net = require('net')
const socket = net.createConnection({
  host: 'ke.qq.com', // 这里不要写协议了，因为这里是TCP/IP，不需要协议了
  port: 80 // 端口写不对，连接没反应
}, (data) => {
  console.log('创立连接成功：', data);
})
// console.log(socket);

// 向流中写入内容
// socket.write('hello world!')

// 发送get请求
/* 
socket.write(`请求行\n
请求头\n
\n
请求体
`)
*/
socket.write(`GET / HTTP/1.1
Host: ke.qq.com:8080
Connection: keep-alive

`) // 请求头可以多个，但最后的一行请求体一定要有，不然服务器拿不到请求体，请求会一直挂起

// 读取流的内容（响应内容）
socket.on('data', chunk => {
  console.log('接收来自服务器的响应消息');
  console.log(chunk.toString('utf-8'));
  /* 
    执行：socket.write('hello world!')
    返回结果如下：一个http协议的响应头【字符串】
    HTTP/1.1 400 Bad Request
    Server: ias/1.3.5_1.17.3
    Date: Sun, 14 Feb 2021 10:47:58 GMT
    Content-Type: text/html
    Content-Length: 161
    Connection: close

    <html>
    <head><title>400 Bad Request</title></head>
    <body>
    <center><h1>400 Bad Request</h1></center>
    <hr><center>ias/1.3.5_1.17.3</center>
    </body>
    </html>

   */

   socket.end() // 手动结束并断开连接。但要慎用，有可能流没有传完就断开了。
})
