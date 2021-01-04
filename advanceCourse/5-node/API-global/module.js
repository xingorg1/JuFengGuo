// console.log(__dirname)
// console.log('这是一个module.js模块')
console.log('__dirname', __dirname)
console.log('__filename', __filename)
console.log(module)
console.log(exports)
console.log(module.exports === exports) // true
console.log(module.exports === this) // true
console.log(exports === this) // true
// exports.c = 3
module.exports = {
    a: 1
}
exports = {
    c: 3
}
// module.exports.a = 1
this.b = 2