// 静态资源服务器
const http = require('http')
const url = require('url')
const path = require('path');
const fs = require('fs');
const contentTypeJson = require('./contentTypeJson.json')
const server = http.createServer({}, async (req, res) => {
  // 思路: 解析请求的路径，对应返回不同的文件
  console.log(req.url);
  let { pathname } = urlHandle(req.url || {})
  let { fileName, extName } = fileInfoHandle(pathname || '')
  let responseBody = await bodyHandle(fileName)
  res.setHeader('Content-type', contentTypeJson[extName])
  res.write(responseBody)
  res.end()
})

server.listen(1993, (data) => {
  console.log('http://localhost:1993', data);
})
server.on('listening', () => {
  console.log('listen事件触发了');
})

// 得到请求的文件路径
function urlHandle(urlObj) {
  urlObj = url.parse(urlObj)
  console.log(urlObj);
  return urlObj
}

// 得到要处理的文件地址
function fileInfoHandle(pathName) {
  console.log(pathName, 'pathName');
  if (!pathName || pathName === '/') pathName = 'index.html'
  fileName = path.join(__dirname, 'public', pathName)
  let isExists = fs.existsSync(fileName)
  if (!isExists) {
    fileName = path.join(__dirname, 'public', '404.html')
  }
  extName = path.extname(fileName)
  return {
    fileName,
    extName
  }
}

// 得到要处理的文件信息
async function bodyHandle(fileName) {
  let body = ''
  body = await fs.promises.readFile(fileName)
  return body || ''
}

// 文件不存在的处理 404
function handle404() {

}