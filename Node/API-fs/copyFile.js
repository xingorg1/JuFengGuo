// 自己写一个文件复制功能
const path = require('path')
const fs = require('fs')
const fromUrl = path.resolve(__dirname, './WechatIMG157.jpeg');
const toUrl = path.resolve(__dirname, './WechatIMG157_copy.jpeg');

const copyRst = fs.readFileSync(fromUrl)
fs.writeFileSync(toUrl, copyRst) // writeFile的回调函数参数是必填的
