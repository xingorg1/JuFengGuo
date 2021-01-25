const fs = require('fs')

const path = require('path')
const pathUrl = path.resolve(__dirname, './white.md') // 找不到文件会自动创建
const pathUrl1 = path.resolve(__dirname, './123.md') // 找不到文件会自动创建

const os = require('os')
const eol = os.EOL

fs.writeFile(pathUrl, '我是要写入的内容\n', { // 手写换行符
  encoding: 'utf-8' // 不填这个参数，默认就是这个编码方式
  // flag 默认是 'w': 打开文件用于写入。 如果文件不存在则创建文件，如果文件存在则截断文件。
}, (err, data) => {
  if (err) throw err
  console.log(err, data, '写入成功！') // null undefined '写入成功！'
})

const content = '我是后来追加的内容' + eol + '换行了奥吼！'
// console.log(content)
fs.writeFile(pathUrl, content, { // 兼容性写法
  flag: 'a' // a表示append， 追加内容
}, (err, data) => {
  if (err) throw err
  console.log('追加成功', err, data)
})

// 一个不存在的路径，stat会报错。要用try、catch捕获。
async function testStat() {
  try {
    const result = await fs.promises.stat(pathUrl1)
    console.log(10, result)
  } catch (error) {
    console.log(12, error)
  }
}
testStat() // ？ 这里为什么先打印11、后打印10呢？await没阻塞吗？

console.log(11, Buffer)
let bufferData = new Uint8Array(Buffer.from('不存在的文件直接写入，会直接创建文件的！')) // 写入一个Buffer
/* fs.promises.writeFile(pathUrl1, bufferData, {}, (err, data) => { // 这种写法，回调函数不执行
  console.log(err)
  if (err) throw err
  console.log('向不存在的文件写入内容成功', err, data)
}) */
// 注意，promises的函数调用后返回promise对象，需要then来接收
fs.promises.writeFile(pathUrl1, bufferData)
  .then((err, data) => {
    console.log(err)
    if (err) throw err
    console.log('向不存在的文件写入内容成功', err, data)
  })

// 目录不存在，写入报错
const pathDirectory = path.resolve(__dirname, './noThatPath/abc.md')
fs.writeFile(pathDirectory, '不存在的目录会导致错误', 'utf-8', (err) => {
  console.log('目录不存在，出错啦！', err) // Error: ENOENT: no such file or directory
})

// 写入时的容错处理
try {
  const isFile = fs.statSync(pathDirectory);
  isFile && fs.writeFile(pathDirectory, '不存在的目录会导致错误', 'utf-8', (err) => {
    console.log('目录不存在，出错啦！', err) //这样就不会走到这一行了
  })
  console.log('是否是一个文件夹', isFile.isDirectory())
}
catch (error) {
  console.log('抛出错误~', error) // 抛出错误~ ReferenceError: pathDirectory is not defined
}

