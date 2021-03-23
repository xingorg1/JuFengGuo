// 常用中间件 - express.json
const express = require('express')
const path = require('path')
const app = express()
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(express.json())
app.post('/api/person', (req) => {
  console.log(req.body); // 得到传参并格式化：{ name: 'xing.org1^', age: '18' }
})

app.listen(1015, () => {
  console.log('http://localhost:1015')
})