const fs = require('fs')
const path = require('path')
const { log } = console
// 获取文件状态信息
const filePath = path.resolve(__dirname, './demo.md')
const result = fs.statSync(filePath)
log(result)
log(result.isFile()) // true
log(result.isDirectory()) // false
/*
打印文件状态信息如下：
Stats {
  dev: 16777220,
  mode: 33188,
  nlink: 1,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 23088180,
  size: 17, // 占用的字节数
  blocks: 8,
  atimeMs: 1611617649468.4607,
  mtimeMs: 1610180595594.916,
  ctimeMs: 1610180595594.916,
  birthtimeMs: 1610180409792.5103,
  atime: 2021-01-25T23:34:09.468Z, // 上次访问的时间
  mtime: 2021-01-09T08:23:15.595Z, // 上次修改的时间戳
  ctime: 2021-01-09T08:23:15.595Z, // 上次改动文件状态的时间戳（比如修改文件权限等）
  birthtime: 2021-01-09T08:20:09.793Z // 创建时间
}
*/

// 获取目录信息
const directoryPath = path.resolve(__dirname, '../API-fs')
const directoryPath2 = path.resolve(__dirname, './directory')
log(directoryPath)
const directoryStat = fs.statSync(directoryPath)
const directoryStat2 = fs.statSync(directoryPath2)
log(directoryStat)
log(directoryStat.isFile()) // false
log(directoryStat.isDirectory()) // true
/* 
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 10,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 23085697,
  size: 320,
  blocks: 0,
  atimeMs: 1611619706814.891,
  mtimeMs: 1611619440088.5498,
  ctimeMs: 1611619440088.5498,
  birthtimeMs: 1610176628378.776,
  atime: 2021-01-26T00:08:26.815Z,
  mtime: 2021-01-26T00:04:00.089Z,
  ctime: 2021-01-26T00:04:00.089Z,
  birthtime: 2021-01-09T07:17:08.379Z }
 */
log(directoryStat2)
log(directoryStat2.isFile()) // false
log(directoryStat2.isDirectory()) // true
/* 
Stats {
  dev: 16777220,
  mode: 16877,
  nlink: 2,
  uid: 501,
  gid: 20,
  rdev: 0,
  blksize: 4096,
  ino: 23408574,
  size: 64,
  blocks: 0,
  atimeMs: 1611618429963.7688,
  mtimeMs: 1611618410209.0374,
  ctimeMs: 1611618410209.0374,
  birthtimeMs: 1611618410209.0374,
  atime: 2021-01-25T23:47:09.964Z,
  mtime: 2021-01-25T23:46:50.209Z,
  ctime: 2021-01-25T23:46:50.209Z,
  birthtime: 2021-01-25T23:46:50.209Z }
 */

// 目录状态中size为0的解释：
// 操作系统中，目录是一个空的文件，里边记录了指针，指向其他文件的地址。
// 经过测试。mac中size不为0，视频中win系统为0。初步认识为操作系统的原因。
