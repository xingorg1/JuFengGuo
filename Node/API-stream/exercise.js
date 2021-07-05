// 利用文件流的方式，读取一个10MB的文件，新建并copy另一个文件中。
const fs = require('fs')
const path = require('path')
console.time('test');
const fileName = path.resolve(__dirname, './demo.md')
const copyFileName = path.resolve(__dirname, './demo_copy.md')

const rs = fs.createReadStream(fileName, {
  highWaterMark: 1, // 我这里就不用10MB了，搞个小文件模拟一下
  autoClose: true
})
const ws = fs.createWriteStream(copyFileName, {
  highWaterMark: 1,
  autoClose: true
})

rs.on('data', buffer => {
  console.log('读取内容后，准备写入内容:', buffer.toString());
  const flag = ws.write(buffer)
  !flag && rs.pause()
})

ws.on('drain', () => {
  console.log('====写入队列drain, 继续写');
  rs.resume()
})

rs.on('close', () => {
  console.log('rs close: 写完了');
  ws.end()
})

ws.on('close', () => {
  console.log('ws close');
  console.timeEnd('test');
})