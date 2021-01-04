export default {
    name: 'es模块化导出方式'
}
// ReferenceError: module is not defined。
// module.exports = { // 这是因为module本来是函数里的参数，但这段代码这次因为用了es6的模式，不会被放到函数里执行了，因此module变量就没法使用了。
//     name: 'commonjs导出方式，是不允许的'
// }