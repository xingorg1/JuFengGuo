"use strict";

var _dec, _class, _class2, _descriptor, _descriptor2, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-22 10:32:13 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-22 13:23:24
 */

/* 迭代 - 面向对象写法 */
var onInput = document.getElementById('inp'),
    oBtn = document.getElementById('btn');
console.log('----------------他们的执行顺序还真值的研究---------------------');
var Search = (_dec = arrowFunc('装饰器传参'), decoratorClass(_class = (_class2 = (_temp =
/*#__PURE__*/
function () {
  function Search() {
    _classCallCheck(this, Search);

    _initializerDefineProperty(this, "url", _descriptor, this);

    _initializerDefineProperty(this, "arrowFunc", _descriptor2, this);

    this.keyValue = '';
  }

  _createClass(Search, [{
    key: "getContent",
    value: function getContent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var a = arguments.length > 1 ? arguments[1] : undefined;
      // this.url = '此时url被设置为不可写，已经不能修改了。会报错'//测试装饰器@urlWritable
      console.log("\u5DF2\u53D1\u9001 \u3010".concat(this.keyValue || '初始值XXX', "\u3011 \u5230\u5730\u5740 \u3010").concat(this.url || '默认值', "\u3011 + \u3010").concat(params, ",").concat((params, a), "\u3011"));
      return '原型上的属性';
    }
  }]);

  return Search;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "url", [urlWritable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return 'url-a';
  }
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "arrowFunc", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return function () {
      return '因为箭头函数的关系，我成了私有属性';
    };
  }
}), _applyDecoratedDescriptor(_class2.prototype, "getContent", [getContent1, getContent2], Object.getOwnPropertyDescriptor(_class2.prototype, "getContent"), _class2.prototype)), _class2)) || _class); // 给类添加装饰

function decoratorClass(target) {
  console.log(target);
} // 装饰器decorator - 装饰私有属性


function urlWritable(proto, key, descriptor) {
  //重点是第三个参数，可以通过他对属性进行修饰。
  // 函数里边，对被修饰的属性url进行自定义的修饰操作
  console.log({
    'Search原型': proto,
    '所修饰的属性': key,
    '装饰器对象': descriptor // 类似Object.defineProperty的第三个参数

  });
  descriptor.writable = false; //让私有属性url不可写

  console.log('改版前结果：', descriptor.initializer()); //调用后正好是属性值，可以用来改变属性值

  descriptor.initializer = function () {
    return '新改版url的值';
  };

  console.log('改版后结果：', descriptor.initializer());
} // 装饰器decorator - 装饰私有 方法 （箭头函数生成的私有方法）


function arrowFunc(params) {
  console.log('！！！！ ' + params); //新用法

  return function (proto, key, descriptor) {
    console.log('-------------------------------------');
    console.log('！！！！ ' + params); //新用法

    console.log('箭头函数生成的私有方法', {
      'Search原型': proto,
      '所修饰的属性': key,
      '装饰器对象': descriptor
    });
  };
} // 装饰器decorator - 装饰原型上的属性


function getContent1(proto, key, descriptor) {
  console.log('-------------------------------------');
  console.log({
    'Search原型': proto,
    '所修饰的属性': key,
    '装饰器对象': descriptor
  });
  console.log(descriptor.value()); //得到方法的返回值“原型上的属性”
} // 装饰器decorator - 装饰原型上的属性 - 相当于李四的代码
// function getContent2(proto, key, descriptor) {
//   console.log('第2个装饰器？--可以！！！添加李四的代码功能');
//   descriptor.writable = false;
//   var oldgetContent = descriptor.value;//先存
//   var count = -1;//因为初始化就会调用一次
//   descriptor.value = function(){//后重写
//     // console.log(this);//下边oS调用，this指向oS
//     count++;
//     console.log(count,'埋点计数被执行，发送到别的服务器做热力图用。。。');
//     // return oldgetContent.call(this,arguments[0],arguments[1]); //代理实现
//     return oldgetContent.apply(this,arguments); //代理实现
//   }
// }


var oS = new Search();
console.log(oS.url);

onInput.oninput = function (e) {
  oS.keyValue = this.value;
};

oBtn.onclick = function () {
  // 模拟发送请求
  var rst = oS.getContent('参数1', '参数2'); //此时再调用的就是装饰器getContent2里边修改的descriptor.value()方法了。

  console.log('getContent返回值', rst);
}; // 装饰器decorator - 装饰原型上的属性 - 相当于李四的代码


function getContent2(proto, key, descriptor) {
  console.log('第2个装饰器？--可以！！！添加李四的代码功能');
  descriptor.writable = false;
  var oldgetContent = descriptor.value; //先存

  var count = -1; //因为初始化就会调用一次

  descriptor.value = function () {
    //后重写
    // console.log(this);//下边oS调用，this指向oS
    count++;
    console.log(count, '埋点计数被执行，发送到别的服务器做热力图用。。。'); // return oldgetContent.call(this,arguments[0],arguments[1]); //代理实现 - call需要传多个参数

    return oldgetContent.apply(this, arguments); //代理实现。apply自动把所有参数集合到数组中传过去
  };
}
