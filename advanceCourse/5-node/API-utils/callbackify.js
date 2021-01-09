const utils = require('util')
async function delay (duration) {
  return await new Promise((res, rej) => {
     setTimeout(() => {
       res('我是异步函数的响应结果')
     }, duration)
  })
}

delay(1000).then((data) => {
  console.log(111, data)
})

// 转换成callback形式的异步函数：
const callbackDelay = utils.callbackify(delay)
console.log(callbackDelay)
callbackDelay(3000, (err, data) => { // 回调的模式是node模式，第一个参数是err，第二个是响应结果
  console.log(222, data)
})
