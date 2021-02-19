/**
 * 仿写urlencoded中间件
 */
const qs = require('querystring') // 第三方库，解析内容用的
module.exports = (options) => {
  console.log(options);
  return (req, res, next) => {
    if (req.headers['content-type'] === 'application/x-www-form-urlencoded') {
      // 解析消息体
      let rst = ''
      req.on('data', chunk => {
        rst += chunk // buffer累加
      })
      req.on('end', () => {
        req.body = Object.assign({}, qs.parse(rst)) // 用assign解决body打印出来 “[Object: null prototype] {……}” 的效果。纯打印“{……}”就行了
        next()
      })
    } else {
      next(); // 向下移交
    }
  }
}
