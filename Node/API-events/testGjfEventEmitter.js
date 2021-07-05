const GjfEventEmitter = require('./GjfEventEmitter');

const gjfEmitter = new GjfEventEmitter();

gjfEmitter.on('gjfEmitter', () => {
  console.log('gjfEmitter1 -被触发');
});
gjfEmitter.on('gjfEmitter', () => {
  console.log('gjfEmitter2 - 被触发 --- ');
});
gjfEmitter.on('gjfEmitter233', () => {
  console.log('233， 自己封装的');
});
gjfEmitter.once('gjfEmitter', () => {
  console.log('==once==');
});
gjfEmitter.emit('gjfEmitter');
gjfEmitter.emit('gjfEmitter');
gjfEmitter.emit('gjfEmitter');
gjfEmitter.emit('gjfEmitter233');


console.log('==测试移除事件==');
//  移除事件
let eventCB = () => {
  console.log('移除事件，移除后就没了。');
}
gjfEmitter.on('offEvent', eventCB);
gjfEmitter.on('offEvent', ()=>{
  console.log('我没被移除，可以调两次');
});
gjfEmitter.emit('offEvent', eventCB);
gjfEmitter.off('offEvent', eventCB);
gjfEmitter.emit('offEvent', eventCB); // 移除后再触发就没了

// 带参数测试
gjfEmitter.on('gjfEmitterParams', (...data) => {
  console.log('打印参数:');
  console.log( data, typeof data);
});
gjfEmitter.emit('gjfEmitterParams', '小石头', 'xing.org1');


/** 打印结果如下
gjfEmitter1 -被触发
gjfEmitter2 - 被触发 ---     // 以上两个被多次触发
==once==                    // 因为once注册一次性，所以多次调用也只触发了一次
gjfEmitter1 -被触发
gjfEmitter2 - 被触发 --- 
gjfEmitter1 -被触发
gjfEmitter2 - 被触发 --- 
233， 自己封装的              // 测试：注册多个不同名事件
==测试移除事件==
移除事件，移除后就没了。        // 移除成功
我没被移除，可以调两次
我没被移除，可以调两次
打印参数 [ '小石头', 'xing.org1' ] object
 */


