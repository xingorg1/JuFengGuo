const express = require('express')
const { log, dir } = console
// dir(express)
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
// 托管静态文件
// app.use(express.static('./'))
// app.use(express.static('public'))
// the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.resolve(__dirname, 'public')))


// The app responds with 「indexHtml」file for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
app.get('/', (req, res) => {
  log('请求', req)
  // let indexHtml = fs.readFileSync(path.resolve(__dirname, './index.html'))
  // res.send(indexHtml)
  res.send('接收到了你的请求，给你返回点什么吧~') // 它会帮你设置Content-Length
})



app.listen({
  port,
  host: '127.0.0.1'
}, () => { // listen  接受的参数和node.net.Server#listen()的方法一致:
  log(`监听3000端口中，访问地址http://localhost:${port}`)
})