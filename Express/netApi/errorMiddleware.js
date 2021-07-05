// 专门处理错误的中间件
module.exports = (err, req, res, next) => {
  console.log(req.baseUrl)
  if(err) {
    res.status(500).send({
      code: 500,
      msg: err instanceof Error ? err.message : '粗错啦'
    })
  } else {
    next()
  }
}