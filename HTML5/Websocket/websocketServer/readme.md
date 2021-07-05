## 自己写一个webSocket服务端
1、npm init -y (快速创建一个package.json文件)

2、npm i nodejs-websocket（添加依赖包）

3、添加server.js入口文件

4、配置相关代码：

```js
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
```

### 一个使用案例
html：
```html
  <div class="demo">
    <input type="text" placeholder="请输入要发送的内容" id="ipt">
    <button id="btn">发送请求</button>
    <p>
      响应结果如下：
    </p>
    <div id="rst"></div>

    <button id="closeBtn">断开连接</button>
  </div>
```

js：
```js
  // open：建立连接
  // var websocket = new WebSocket('ws://echo.websocket.org');// 使用ws官方提供的服务器
  var websocket = new WebSocket('ws://localhost:8080'); // 使用我自己配置的服务器,前提要去websocketServer文件夹中把服务启动一下:node server.js

  websocket.addEventListener('open', function (e) {
    console.log(e, websocket.readyState);
    // websocket.send('发送一个方法')
    // websocket.send('xing.org1^')
    btn.onclick = function (a) {
      // console.log(a)
      websocket.send(ipt.value);
    }
  });

  // 接收返回值：
  websocket.addEventListener('message', (e) => {
    console.log(e);
    rst.innerHTML = e.data;
  });

  closeBtn.onclick = function (e) {
    console.log(e);
    websocket.close(3000,'主动请求断开连接吧');//断开连接
  }
  websocket.addEventListener('close', function (e) {
    console.log('连接断开了', e);
  }); 
```