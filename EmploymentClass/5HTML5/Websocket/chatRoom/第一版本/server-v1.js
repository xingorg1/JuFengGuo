/*
 * @Author: @Guojufeng 
 * @Date: 2019-06-02 19:42:06 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-06-02 20:21:55
 * 第一版本，最简版
 */
const ws = require('nodejs-websocket');
const POST = 8081;
let count = 0;//记录加入人数

const server = ws.createServer((connect)=>{
  count++;// 有人加入，计数加一
  connect.userName = `用户${count}`;//connet是一个对象，新增一个属性用以标记该用户的名字（标识）

  // 1、通知所有人，connect用户加入群聊
  broadcast(`${connect.userName}加入群聊。`);

  // 2、通知所有人，connect用户发言
  connect.on('text',(rst)=>{
    broadcast(`${connect.userName}: ${rst}`);
  })

  // 3、通知所有人，connect用户退出群聊
  connect.on('close',(code,reason)=>{//个人认为利用code和reason这里，还可以模拟微信群聊中，用户被群主踢出群的情况
    broadcast(`${connect.userName}退出了群聊。`);
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
  server.connections.forEach((element)=>{
    element.send(cont);
  });
}


server.listen(POST,()=>{
  console.log(`${POST}服务器启动成功。`)
})