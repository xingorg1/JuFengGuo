const express = require('express')

const app = express()
app.listen(1015, () => {
  console.log('http://localhost:1015');
})

app.get('/my-path', () => {
  console.log('use middle ware');
  throw(new Error('久坐容易猝死是真的，我现在有点上不来气'))
})
app.use(require('./errorMiddleware'))


// 三个回调会依次执行
app.get('*', (req, res, next) => {
  console.log('middleWare 1');
  // throw new Error(123)
  next(new Error('错误消息的文案'))
  // next()
}, require('./errorMiddleware'), (err, req, res, next) => {
  console.log('middle ware 2');
  // console.log('Error🌶', err);
  res.status(300)
  res.end()
  throw new Error(123)
  next()
}, (err, req, res, next) => {
  console.log('middle ware 3');
  res.status(304)
  res.end()
  next()
})