// CommonJs规范：导出exports = {}
// exports是commonJs的规范，node基于此规范，实现模块化。并新增了自己的特色module.exports。module.exports = exports = {}，但是如果开发者直接将module.exports重新赋值的话，会打破module.exports和exports之间的链接。之后在用exports.xxx的方式导出将不能被外部接收。
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