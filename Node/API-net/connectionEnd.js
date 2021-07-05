// 通过判断Content-Length的长度和已接收流的总长度，来决定是否调用end断开连接
const net = require('net')
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './response.html')
const ws = fs.createWriteStream(fileName, {
  encoding: 'utf-8',
  highWaterMark: 30
})

const socket = net.createConnection({
  host: 'ke.qq.com',
  port: 80
})

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com

`)

socket.on('close', data => {
  console.log('结束了：', data);
})

// 老师
let responseCont = null
socket.on('data', chunk => {
  const content = chunk.toString('utf-8')
  if (!responseCont) {
    // 第一次
    responseCont = parseResponse(content)
    if (isOver()) {
      ws.write(responseCont.body)
      socket.end();
    }
    return;
  }
  responseCont.body += content
  ws.write(responseCont.body)
  if (isOver()) {
    socket.end();
  }
  // if (header && body && Number(header['Content-Length']) >= body.length) {
  //   socket.end()
  // }
})

function isOver() {
  // 需要接收的消息体的总字节数
  const { header, body } = responseCont
  const contentLength = Number(header['Content-Length']);
  const currentBodyLength = Buffer.from(body, 'utf-8').byteLength;
  // console.log(contentLength, currentBodyLength);
  return currentBodyLength >= contentLength
}
function parseResponse(response) {
  // console.log(response);
  const splitToken = '\r\n\r\n' // 空行是关键，用两个换行匹配。人才！
  const responseArr = response.split(splitToken)
  const headers = responseArr[0]
  const body = responseArr[1]
  // 请求头处理
  const headerCont = headers.split('\r\n')
  const headerObj = {}
  headerCont.slice(1).map((el) => { // 排除响应行以后分隔响应头
    let arr = el.trim().split(': ')
    headerObj[arr[0]] = arr[1]
  })
  // console.log(headerObj['Content-Length']);
  return {
    header: headerObj,
    body
  }
}


// 我的
// let sumLength = 0
// let socketLength = 0
// socket.on('data', chunk => {
//   // console.log(chunk.toString().split('\r\n'));
//   let content = chunk.toString()
//   if (content.includes('Content-Length')) {
//     let responseHeader = content.split('\r\n')
//     responseHeader.forEach((str) => {
//       if (str.includes('Content-Length')) {
//         let lengthArr = str.split(':')
//         sumLength = lengthArr[1].trim()
//       }
//     })
//     // console.log(sumLength);
//     // console.log(content.split(content.indexOf('\r\n')));
//   }
//   socketLength += chunk.length
//   if (socketLength >= sumLength) {
//     // console.log(socketLength);
//     socket.end()
//   }
// })
