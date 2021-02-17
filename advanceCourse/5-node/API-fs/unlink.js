// 删除文件或符号链接

// unlink 异步
// unlinkSync 同步

// 回调只有异常
const fs = require('fs')
// // 假设 '文件.txt' 是普通的文件。
// fs.unlink('文件.txt', (err) => {
//   if (err) throw err; // no such file or directory
//   console.log('能走到这里，表明文件已被删除');
// });

const path = require('path')
// console.log(path.resolve('./deletetest.md'))

// fs.unlink(path.resolve(__dirname, './deletetest.md'), (err) => {
//   if(err) throw err;
//   console.log('文件删除成功')
// })

// 写入文件再删除
let pathName = path.resolve(__dirname, './deletetest.md')
const rst = fs.writeFileSync(pathName, '写了再删')
setTimeout(() => {
  fs.unlink(pathName, (err) => {
    if (err) throw err;
    console.log('文件删除成功')
  })
}, 3000)

// 写入文件夹再删除
let dirName = path.resolve(__dirname, 'testDir')
console.log(dirName)
fs.mkdirSync(dirName)
// setTimeout(() => {
//   fs.unlink(dirName, (err) => { // operation not permitted。
//     if (err) throw err;
//     console.log('文件夹没了！')
//   })
// }, 3000)

// fs.unlink() 对空或非空的目录均不起作用。 若要删除目录，则使用 fs.rmdir()
setTimeout(() => {
  fs.rmdir(dirName, (err) => {
    if (err) throw err;
    console.log('文件夹没了！')
  })
}, 3000)