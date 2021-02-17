// 利用eventEmitter自己封装一个http请求模块

// 发送网络请求
const http = require('http')
const { EventEmitter } = require('events')
const { RSA_NO_PADDING } = require('constants')

module.exports = class extends EventEmitter {
  constructor(url, options) {
    super()
    this.url = url
    this.options = options
  }
  send(body = '') {
    const request = http.request(this.url, this.options, res => {
      let body = ''
      res.on('data', chunk => {
        body += chunk.toString('utf-8')
      });
      res.on('end', () => {
        this.emit('res', res.headers, body)
      })
    })
    request.write(body)
    request.end()
  }
}