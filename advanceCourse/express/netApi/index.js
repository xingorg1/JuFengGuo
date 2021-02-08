const { log, dir } = console
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')

// 激活了"trust proxy" 设置,Express 就会知道它在一个代理的后面.比如Nginx反向代理之后的express服务
app.enable('trust proxy') // 激活反向代理 将设置项 括号中参数 的值设为 true.
log(app.enabled('trust proxy')) // 检查设置结果是否已启用



/* 中间件 - 托管静态文件 【中间件的顺序很重要，use的先后顺序决定了中间件的优先级】 */
// app.use(express.logger()); // 在静态文件之前logger，记录静态资源的请求了
// app.use(express.static('./'))
// app.use(express.static('public'))
// the path that you provide to the express.static function is relative to the directory from where you launch your node process. If you run the express app from another directory, it’s safer to use the absolute path of the directory that you want to serve:
app.use(express.static(path.resolve(__dirname, 'public'))) // // GET /public/favicon.ico
log(__dirname) // __dirname可以直接用，因为在module.exports里已经导出了
app.use('/static', express.static(__dirname + '/public')); // 改路径 // GET /static/favicon.ico


/* 日志记录 */
// app.use(express.logger()); // throw new Error：Most middleware (like logger) is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
const morgan = require('morgan')
// app.use(morgan('一条请求日志： :method :url :status')); // 在静态文件之后logger，就不记录静态资源的请求了

/* // 将所有类型日志、所有日期的都写入同一个文件
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' }) 
app.use(morgan('combined', {
  stream: accessLogStream
})) // Predefined Formats(指定格式): 标准Apache合并日志输出 */

// create a rotating write stream 每天写入一个文件
const rfs = require('rotating-file-stream') // version 2.x
const accessLogStreamDaily = rfs.createStream('access.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})
app.use(morgan('combined', { stream: accessLogStreamDaily })) // setup the logger


/* 响应请求 */
// The app responds with 「indexHtml」file for requests to the root URL (/) or route. For every other path, it will respond with a 404 Not Found.
app.get('/', (req, res) => {
  // log('请求', req)
  let indexHtml = fs.readFileSync(path.resolve(__dirname, './index.html'))
  res.send(indexHtml)
})
app.get('/getData', (req, res) => {
  // log('请求', req)
  res.send({
    code: 200,
    flag: true,
    info: '这是成功的文字',
    msg: 'success'
  })
})
// 响应任何请求
// app.use(function(req, res, next){
//   log(12)
//   res.send('Hello World');
// });

/* 监听端口 */
app.listen({
  port,
  host: '127.0.0.1'
}, () => { // listen  接受的参数和node.net.Server#listen()的方法一致:
  log(app.get('env')) // 获取设置项
  log(`监听3000端口中，访问地址http://localhost:${port}`)
})