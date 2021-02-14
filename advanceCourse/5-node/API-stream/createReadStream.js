// 文件可读流
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './demo.md')
// 返回一个ReadStream对象，是继承于Readable的子类。Readable里有的他都有。
const rs = fs.createReadStream(fileName, {
  encoding: 'utf-8',
  highWaterMark: 500 // 每次读取5个字符
})

// 内部会触发很多事件，可以通过EventEmitter的「on」进行事件注册
// rs.on(eventName, callback)

rs.on('open', () => {
  console.log('文件被打开');
})
rs.on('error', () => {
  console.log('文件出错');
})
rs.on('data', (chunk) => {
  console.log('获取到流里边数据的事件，没读一块数据就会触发一次这里的事件');
  console.log(chunk);
})
rs.on('end', () => {
  console.log('读取完毕');
})

// rs.close() 手动关闭文件
rs.on('close', () => {
  console.log('文件被关闭');
})