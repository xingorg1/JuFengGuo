const fs = require('fs')

const path = require('path')
const pathUrl = path.resolve(__dirname, './demo.md')

fs.readFile(pathUrl, (err, data) => {
  // 不配置编码格式，返回一个buffer
  console.log(1, data) // <Buffer 31 32 33 20 61 62 63 20 e9 83 ad e8 8f 8a e9 94 8b>
  // 转成字符串
  console.log(2, data.toString())  // returns：123 abc 郭菊锋
})

// 配置编码格式
fs.readFile(pathUrl, 'utf-8', (err, data) => { 
  console.log(3, data) // returns：123 abc 郭菊锋
})

fs.readFile(pathUrl, {
  // 配置编码格式
  encoding: 'utf-8' 
}, (err, data) => {
  console.log(4, data) // returns：123 abc 郭菊锋
})

console.log(5, '我先输出，他们都是异步的！')


// 同步函数readFileSync - 不仅阻塞下边的代码执行，也阻塞上边的异步函数的执行（因为占用了主线程）
console.log('123')
const result = fs.readFileSync(pathUrl, 'utf-8')
console.log(6, result)
console.log('456')

// promise
// console.log(7, fs.promises)
const promiseRst = fs.promises.readFile(pathUrl, 'utf-8')
.then((data) => {
  console.log(8, data, promiseRst)
})
setTimeout(() => {
  console.log(10, promiseRst)
}, 1000)
console.log(9, promiseRst) // Promise { <pending> } 这里之所以是pending状态的，