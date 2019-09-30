/*
 * @Author: @Guojufeng 
 * @Date: 2019-04-18 16:01:18 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-04-18 16:16:14
 * cmd學習
 */
引入
<script src="./sea.js">
注册
seajs.use('./main.js')
定义 - module.js
define(function(require,exports,module){
  // ...
  // 暴露接口1
  exports.moduleName = objValue;
  // 暴露接口2
  module.exports = {
    moduleName: moduleName
  }
});
调用 - main.js
define(function(require,exports,module){
  var module = require('module.js')
  console.log(module)
});