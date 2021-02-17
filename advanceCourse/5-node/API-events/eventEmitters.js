// 什么事eventEmitter，看效果：
// res.on('data', () => {})
// rs.on('data', () => {})
// socket.on('data', () => {})

// 真正的eventEmitter模块使用
const { EventEmitter } = require('events'); // 导入eventEmitter 类

const myEmitter = new EventEmitter(); // 创建一个事件处理对象，用于注册、触发事件

// 注册事件 on
myEmitter.on('eventsName', () => {
  console.log('注册事件1 -被触发');
});
myEmitter.on('eventsName', () => {
  console.log('注册事件2 - 被触发');
});
// 注册事件 once
myEmitter.once('eventsName', () => {
  console.log('注册一次性事件');
});
/* 
注册事件第二种写法：
emitter.addListener(eventName, listener) // on的别名 
*/

// 触发事件 emit
// 触发名为"eventsName"的事件，会依次运行注册的事件函数
myEmitter.emit('eventsName');

myEmitter.emit('eventsName'); // 还可以多次触发
myEmitter.emit('eventsName');

console.log('=====');
//  移除事件
let eventCB = () => {
  console.log('移除事件，移除后就没了。');
}
myEmitter.on('offEvent', eventCB);
myEmitter.on('offEvent', () => {
  console.log('我没被移除，可以调两次');
});
myEmitter.emit('offEvent', eventCB);
myEmitter.off('offEvent', eventCB);
myEmitter.emit('offEvent', eventCB); // 移除后再触发就没了


// 带参数测试
myEmitter.on('myEmitterParams', (...data) => {
  console.log('打印参数:');
  console.log(data, typeof data);
});
myEmitter.emit('myEmitterParams', '小石头', 'xing.org1');
