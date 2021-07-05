## 聊天室功能
1、npm init -y (快速创建一个package.json文件)

2、npm i nodejs-websocket（添加依赖包）

3、添加server.js入口文件

4、配置相关代码：

```js
  /*
  * @Author: @Guojufeng 
  * @Date: 2019-06-02 19:42:06 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-02 21:40:17
  * 优化 - 加入消息类型和当前时间的响应
  */
  const ws = require('nodejs-websocket');
  const POST = 8081;
  let count = 0;//记录加入人数

  const TYPE_LEAVE  = 0;//leave,离开
  const TYPE_ENTRY  = 1;//entry,进入
  const TYPE_SPEAK  = 2;//speak,发言

  const server = ws.createServer((connect)=>{
    count++;// 有人加入，计数加一
    connect.userName = `用户${count}`;//connet是一个对象，新增一个属性用以标记该用户的名字（标识）

    // 1、通知所有人，connect用户加入群聊
    broadcast({
      type: TYPE_ENTRY,
      msg: `${connect.userName}加入群聊。`
    });

    // 2、通知所有人，connect用户发言
    connect.on('text',(rst)=>{
      broadcast({
        type: TYPE_SPEAK,
        msg: `${connect.userName}: ${rst}`
      });
    });

    // 3、通知所有人，connect用户退出群聊
    connect.on('close',(code,reason)=>{//个人认为利用code和reason这里，还可以模拟微信群聊中，用户被群主踢出群的情况
      broadcast({
        type: TYPE_LEAVE,
        msg: `${connect.userName}退出了群聊。`
      });
      count--;// 有人退出，计数减一
    });

    // error事件
    connect.on('error',()=>{
      console.log('发生异常');
    })
  });

  // 广播功能代码
  function broadcast(cont){
    // 利用connections是存放所有加入群聊用户的数组，来给所有人广播内容
    let sendCont = {
      type: cont.type,
      msg: cont.msg,
      time: new Date().toLocaleTimeString()
    };
    server.connections.forEach((element)=>{
      element.send(JSON.stringify(sendCont));//切记，send参数必须是字符串类型，所以这里将对象字符串化
    });
  }


  server.listen(POST,()=>{
    console.log(`${POST}服务器启动成功。`);
  });
```

5、node server.js  （启动服务器）
  
6、聊天室代码
html：
```html
  <div class="container">
    <input type="text" placeholder="请输入要发送的内容" id="ipt">
    <button id="btn">发送</button>
    <button id="closeBtn">退出群聊</button>
    <p>
      群聊内容如下：
    </p>
    <div id="rst"></div>
  </div>
```

js：
```js
  // 聊天室功能
  const ws = new WebSocket('ws://localhost:8081'),
    ipt = document.getElementById('ipt'),
    btn = document.getElementById('btn'),
    closeBtn = document.getElementById('closeBtn'),
    content = document.getElementById('rst');

  // 初次进入聊天室，给个提醒
  ws.addEventListener('open', (e) => {
    console.log('加入聊天室成功', e);
    content.appendChild(creatEle('您已成功加入小石头的群聊~'));
    // 聊天区滚动到底
    goBottom();
  });

  // 接收ws服务器发送的消息，并展示到div#rst当中
  ws.addEventListener('message', (e) => {
    console.log(e.data);
    content.appendChild(creatEle(e.data));
    goBottom();
  });
  // 一个带滚动条的DIV元素,怎么让它的滚动条位置默认保持在最底部?
  function goBottom(){
    content.scrollTop = content.scrollHeight;
  }

  // btn被点击时发送请求
  btn.onclick = function () {
    btnClickEvent();
  }
  ipt.addEventListener('keydown',(e)=>{
    if(e.keyCode ===13){
      btnClickEvent();
    }
  });
  
  // close-btn被点击时退出群聊
  closeBtn.onclick = function () {
    ws.close();
  }

  // 创建一个p标签，存储对应内容，以追加到内容展示区域
  function creatEle(str) {
    console.log(str.indexOf('{'));
    const TYPE_LEAVE = 0; //leave,离开
    const TYPE_ENTRY = 1; //entry,进入
    const TYPE_SPEAK = 2; //speak,发言
    const eleP = document.createElement('p');

    if (str.indexOf('{') == 0) {
      let parseStr = JSON.parse(str);
      eleP.innerHTML = `<span class="timer">${parseStr.time}</span><br/><span class="msg">${parseStr.msg}</span>`;
      switch (parseStr.type) {
        case TYPE_LEAVE:
          eleP.className = 'leave';
          break;
        case TYPE_ENTRY:
          eleP.className = 'entry';
          break;
        case TYPE_SPEAK:
          eleP.className = 'speek';
          break;
        default:
          eleP.className = 'default';
          break;
      }
    } else {
      eleP.innerText = str;
    }
    return eleP;
  }
  // 添加回车发送消息事件
  function btnClickEvent(){
    if (ipt.value.length <= 0) {
      alert('不能发送空消息');
      return;
    }
    ws.send(ipt.value);
    ipt.value = '';
  }
```

7、浏览器打开聊天室入口html文件查看效果

