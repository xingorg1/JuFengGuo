const fs = require('fs')
const path = require('path')
const { log } = console
// 得到一个字符串数组，数组中保存这个目录下边的子目录和子文件（层级为1级。即子目录里边的孙子文件就找不到额）
const dirFile = path.resolve(__dirname, '../API-fs/')
fs.promises.readdir(dirFile)
  .then((data) => {
    log(data)
  })

/* 
[ '.DS_Store',
  'WechatIMG157.jpeg',
  'copyFile.js',
  'demo.md',
  'directory',
  'readFile.js',
  'readdir.js',
  'stat.js',
  'writeFile.js' ]
 */
const dirFile2 = path.resolve(__dirname, './directory')
fs.promises.readdir(dirFile2)
.then((data) => {
  log('空目录', data) // 空目录得到空数组
})

// 文件
/* const dirFile3 = path.resolve(__dirname, '../API-fs/demo.md')
fs.promises.readdir(dirFile3)
.then((data) => {
  log('文件路径得到：', data) // 报错： UnhandledPromiseRejectionWarning: Error: ENOTDIR: not a directory, scandir
})
.catch((err) => {
  log('文件路径得到：', err)
}) */

// 用该方法读取一个不存在的目录
const dirFile4 = path.resolve(__dirname, '../API-fs123123123')
fs.promises.readdir(dirFile4)
.then((data) => {
  log('不存在的目录：', data) // 报错： UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, 
})
.catch((err) => {
  log('不存在的目录：', err) // 不存在的目录： { [Error: ENOENT: no such file or directory, 
})