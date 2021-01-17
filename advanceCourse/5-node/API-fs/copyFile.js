// 自己写一个文件复制功能
const path = require('path')
const fs = require('fs')

const pathUrl = path.resolve(__dirname, './WechatIMG157.jpeg');
const pathCopyUrl = path.resolve(__dirname, './WechatIMG157_copy.jpeg');

const result = fs.readFileSync(pathUrl)
fs.writeFileSync(pathCopyUrl, result) // writeFile的回调函数参数是必填的
