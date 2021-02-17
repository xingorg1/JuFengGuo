// 常用中间件
const express = require('express')
const path = require('path')

const app = express()
const dirPath = path.resolve(__dirname, 'public')
const staticApp = express.static(dirPath)
console.log(staticApp)
app.use(staticApp)
app.listen(1015, () => {
  console.log('http://localhost:1015')
})