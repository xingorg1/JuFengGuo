// pipe
const fs = require('fs')
const path = require('path')
console.time('test');
const fileName = path.resolve(__dirname, './demo.md')
const copyFileName = path.resolve(__dirname, './demo_copy.md')

const rs = fs.createReadStream(fileName, {
  highWaterMark: 1,
  autoClose: true
})
const ws = fs.createWriteStream(copyFileName, {
  highWaterMark: 1,
  autoClose: true
})

rs.pipe(ws) // 下边的代码，大约就是pipe的内部原理


// rs.on('data', buffer => {
//   console.log('写入内容:', buffer.toString());
//   const flag = ws.write(buffer)
//   !flag && rs.pause()
// })

// ws.on('drain', () => {
//   console.log('====写入队列drain, 继续写');
//   rs.resume()
// })

rs.on('close', () => {
  console.log('rs close: 写完了');
  ws.end()
})

ws.on('close', () => {
  console.log('ws close');
  console.timeEnd('test');
})