const util = require('util')

function delay(duration, callback) {
  setTimeout(() => {
    callback(null, '成功回调，给你一些参数') // null对应reject的参数，如果非空就会触发promise的reject错误处理函数。异步状态会被变成rejected
  }, duration)
}

delay(1000, (err, data) => {
  // 回调函数必须是“错误优先”的，就是第一个参数必须是触发错误时传递的内容，会被当作promise的reject参数传递，第二个乃至以后才是resolve的参数。
  console.log(1000, data)
})

const promisifyFn = util.promisify(delay)
promisifyFn(3000).then((data) => {
  console.log(3000, data)
}, (err) => {
  console.log('err', err)
})
.catch((error) => {
  // 处理错误。
  console.log('catch', error)
});