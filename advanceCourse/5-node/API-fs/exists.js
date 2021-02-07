// exists
// fs.exists 已经弃用了

const fs = require('fs')
const path = require('path')

const pathName = path.resolve(__dirname, '../API-global/index.js')
const rst = fs.existsSync(pathName) // 如果路径存在，则返回 true，否则返回 false。
console.log(pathName);
console.log(rst); // true

// const pathName1 = path.resolve(__dirname, '../API-global/index11111.js')
const pathName1 = path.resolve(__dirname, '../API-global')
const rst1 = fs.existsSync(pathName1) // 如果路径存在，则返回 true，否则返回 false。
console.log(pathName1);
console.log(rst1); // false