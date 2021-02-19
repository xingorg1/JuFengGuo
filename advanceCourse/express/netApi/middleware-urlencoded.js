// 常用中间件 - express.urlencoded
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.resolve(__dirname, 'public')))

// 使用自己仿写的
const myUrlencoded = require('./rewriteMiddleware/urlencodedMiddleware')
app.use(myUrlencoded({
  a: 123
}))

// 使用原生提供的
// app.use(express.urlencoded({
//   extended: 'qs', // 使用新的库 qs 来解析消息体
//   // type: "application/x-www-form-urlencoded" // 不用设置，使用默认值"application/x-www-form-urlencoded"
// }))
// 当请求的Content-type与type类型（"application/x-www-form-urlencoded"）匹配，中间件就会进行处理，将请求的数据通过流的方式进行整合，最后将数据存储到req.body中
app.post('/api/person', (req) => {
  console.log(req.body); // 得到传参并格式化：{ name: 'xing.org1^', age: '18' }
})

app.listen(1015, () => {
  console.log('http://localhost:1015')
})