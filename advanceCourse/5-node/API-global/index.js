// console.log(global)
// console.log(process.platform)
// console.log(process.argv)
/* [
  '/usr/.../node', // node的安装路径，node命令的绝对路径（环境变量）
  '/Users/.../API-global/index', // 当前运行文件的绝对路径
  '1',
  '2',
  '3'
] */

// console.log(process.env)

// require('/Users/.../API-global/module.js')
// require('./module.js')
// require('./module1.js')
// let a = require('./')
// console.log(a)
// console.log('inde.x.js')
// require('abc')
// require('bsc')
// console.log(module)
// console.log(require)
// console.log(require.resolve('abc')) // abc目录所在路径下的入口文件的绝对路径地址，如/Users/guojufeng/....../API-global/node_modules/abc/index112.js
// console.log(require.main)

let result = require('./module')
console.log(result)