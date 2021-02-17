// 常用中间件 - express.static
const express = require('express')
const path = require('path')

const app = express()
const dirPath = path.resolve(__dirname, 'public')
const staticApp = express.static(dirPath)
console.log(staticApp) // [Function: serveStatic] 返回一个中间件函数

// 直接静态目录设置
app.use(staticApp)

// 基路径设置
// app.use('/static', staticApp)

/* 基路径设置
app.use('/static', (req) => {
  // 访问http://localhost:1015/static/abc/deg
  console.log(req.baseUrl); // 打印「/static」
  console.log(req.path); // 打印「/abc/deg」
}) // use第一个参数表示「基路径」，表示匹配到第一个参数的路径后，才会执行第二个回调参数，也就是调用static后得到的staticApp这个中间件函数
 */

/* // 没有设置基路径
app.use((req) => {
  // 访问http://localhost:1015/static/abc/deg
  console.log(req.baseUrl, typeof req.baseUrl); // 打印 空串
  console.log(req.path); // 打印「/static/abc/deg」
}) */

/* // 修改默认页面配置
app.use(express.static(dirPath, {
  index: 'express.html' // 修改默认页面为express.html
})) */

// 配置多个静态文件目录
console.log(path.resolve(__dirname, 'log'));
const logPath = path.resolve(__dirname, 'log')
app.use('/log', express.static(logPath), (err, req, res, next) => {
  console.log('命中log目录，返回日志文件：');
  next(); // 继续向下
})

app.listen(1015, () => {
  console.log('http://localhost:1015')
})