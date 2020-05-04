// CommonJs规范：导出exports = {}

const abc = 123
exports.abc = abc
exports.handleClickFunc = function () {
  console.log('导出一个函数')
  return '我是handleClickFunc的返回值'
}
// node实现模块化的原理：module.exports = exports = {}
// 所以也可以像下边这么导出
module.exports.moduleExports = '使用module.exports也能给导出的对象身上添加键值对'
 
/* 导出的内容如下：
exports: {
  abc: 123,
  handleClickFunc: function () {
    console.log('导出一个函数')
  },
  moduleExports: '使用module.exports也能给导出的对象身上添加键值对'
} 
*/