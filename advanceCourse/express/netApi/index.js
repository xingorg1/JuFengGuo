const { log, dir } = console
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const logger = require('morgan') // ('logger') //  Most middleware (like logger) is no longer bundled with Express and must be installed separately.
// dir(express)
// log(logger)

// 激活了"trust proxy" 设置,Express 就会知道它在一个代理的后面.比如Nginx反向代理之后的express服务
app.enable('trust proxy') // 激活反向代理 将设置项 括号中参数 的值设为 true.
log(app.enabled('trust proxy')) // 检查设置结果是否已启用



// 中间件 - 托管静态文件 【中间件的顺序很重要，use的先后顺序决定了中间件的优先级】
// app.use(express.logger()); // 在静态文件之前logger，记录静态资源的请求了
// app.use(express.static('./'))
// app.use(express.static('public'))
// the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.resolve(__dirname, 'public'))) // // GET /public/favicon.ico
log(__dirname) // __dirname可以直接用，因为在module.exports里已经导出了
app.use('/static', express.static(__dirname + '/public')); // 改路径 // GET /static/favicon.ico
app.use(logger(':method :url :status')); // 在静态文件之后logger，就不记录静态资源的请求了



// The app responds with 「indexHtml」file for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
app.get('/', (req, res) => {
  log('请求', req)
  // let indexHtml = fs.readFileSync(path.resolve(__dirname, './index.html'))
  // res.send(indexHtml)
  res.send('接收到了你的请求，给你返回点什么吧~') // 它会帮你设置Content-Length
})

// 一个简单的 logger
app.use(function(req, res, next){
  log(11, '===%s %s===', req.method, req.url);
  next();
});
// 响应
app.use(function(req, res, next){
  log(12)
  res.send('Hello World');
});

app.listen({
  port,
  host: '127.0.0.1'
}, () => { // listen  接受的参数和node.net.Server#listen()的方法一致:
  log(app.get('env')) // 获取设置项

  log(`监听3000端口中，访问地址http://localhost:${port}`)
})