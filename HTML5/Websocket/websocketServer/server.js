/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-02 18:21:29 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-02 20:14:20
 */
const ws = require('nodejs-websocket');//引入依赖包
const POST = 8080;//定义端口

// 创建一个server
const server = ws.createServer(connect => {
  //每次只要有新的用户加入，就会为当前用户创建一个connect对象，同时调用一下这个回调函数。
  console.log("New connection");
  
  // text事件：接收用户请求，得到用户传输进来的数据。
	connect.on("text", data => {
    // 每当接受到用户请求事件，这个回调函数就会被触发。
    console.log("Received "+data);
    
    // sendText/send 方法：接受到请求后，响应一个数据给用户
		connect.sendText(data.toUpperCase()+"!!!");//如果直接返回一个data，就会像echo那个服务器一样的功能，接收到什么就返回什么
  });
  
  // 连接断开 触发close事件
	connect.on("close", (code, reason) => {
    console.log("connection closed");
    code && console.log(code);
    reason && console.log(reason);
  });
  
  // error：监听服务异常事件，放置因报错而断掉整个服务。
  connect.on('error', ()=>{
    // 如果触发了close事件，就会走error异常事件(刷新也会)，所以必须加error
    console.log('连接出现异常');
  });
});

server.listen(POST, ()=>{
  console.log('webSocket服务启动成功了，监听了端口'+ POST);
});