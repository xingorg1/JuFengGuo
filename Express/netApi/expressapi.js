const express = require('express')
const { log } = console
// 创建一个应用
const app = express() // [Function: app] 用于处理请求的函数，将不同的请求放到不同的函数中进行处理
// log(app)
app.listen(1993, () => {
  console.log('http://localhost:1993');
})

// 写法同下
// const http = require('http')
// const server = http.createServer(app)
// server.listen(1993, () => {
//   console.log('http://localhost:1993');
// })

/* (app.listen内部所做的就是这些)
app.listen = function listen() {
  var server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
 */

app.get('/', (req, res) => {
  console.log('请求头', req.headers);
  console.log('请求路径', req.path);
  console.log('请求参数', req.query);
  res.setHeader('Content-type', 'text/html')
  res.send([1,2,3])
})

app.get('/abd/:id', (req, res) => {
  console.log('动态路由');
  // 访问 http://localhost:1993/abd/ccc
  console.log('请求参数', req.params); // 请求参数 { id: 'ccc' }
  res.send('<h1>你奶奶</h1>')
})

app.get('/a/:id/:count/:number', (req, res) => {
  console.log('多段动态路由');
  // 访问 http://localhost:1993/a/1/2/3
  console.log('请求参数', req.params); // 请求参数 { id: '1', count: '2', number: '3' }
  res.send({
    abi: 123
  })
})

app.get('/baidu', (req, res) => {
  console.log('重定向');
  // // 函数调用后返回res对象，可以进行链式编程
  // res.status(302).header('localtion', 'https://ke.qq.com/').end()
  // // 调用end后，说明没有消息体，不用调send了。
  // // res.send()

  // 简写1
  // res.status(302).location('https://ke.qq.com/').end()

  // 简写2
  res.redirect(302, 'https://ke.qq.com/')
})