/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-22 10:32:13 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-22 13:23:24
 */
/* 迭代 - 面向对象写法 */
let onInput = document.getElementById('inp'),
  oBtn = document.getElementById('btn');
console.log('----------------他们的执行顺序还真值的研究---------------------')

@decoratorClass
class Search {
  constructor() {
    this.keyValue = '';
  }
  @urlWritable //装饰url为只读不可写.浏览器中跑本段代码的时候，遇到@urlWi..这里，在定义阶段就会执行本段函数
  url = 'url-a';

  // 箭头函数产生私有属性 + 装饰器传参
  @arrowFunc('装饰器传参')
  arrowFunc = () => {
    return '因为箭头函数的关系，我成了私有属性'
  }

  @getContent1 // 装饰一个方法
  @getContent2 // 装饰一个方法
  getContent(params = '',a) {
    // this.url = '此时url被设置为不可写，已经不能修改了。会报错'//测试装饰器@urlWritable
    console.log(`已发送 【${this.keyValue || '初始值XXX'}】 到地址 【${this.url || '默认值'}】 + 【${params },${params , a}】`);
    return '原型上的属性'
  }
}
// 给类添加装饰
function decoratorClass(target){
  console.log(target)
}
// 装饰器decorator - 装饰私有属性
function urlWritable(proto, key, descriptor) { //重点是第三个参数，可以通过他对属性进行修饰。
  // 函数里边，对被修饰的属性url进行自定义的修饰操作

  console.log({
    'Search原型': proto,
    '所修饰的属性': key,
    '装饰器对象': descriptor // 类似Object.defineProperty的第三个参数
  });
  descriptor.writable = false; //让私有属性url不可写
  console.log('改版前结果：', descriptor.initializer()); //调用后正好是属性值，可以用来改变属性值
  descriptor.initializer = function () {
    return '新改版url的值'
  }
  console.log('改版后结果：', descriptor.initializer())
}
// 装饰器decorator - 装饰私有 方法 （箭头函数生成的私有方法）
function arrowFunc(params) {
  console.log('！！！！ '+ params);//新用法
  return function(proto, key, descriptor){
    console.log('-------------------------------------')
    console.log('！！！！ '+ params);//新用法
    console.log('箭头函数生成的私有方法', {
      'Search原型': proto,
      '所修饰的属性': key,
      '装饰器对象': descriptor
    });
  }
}
// 装饰器decorator - 装饰原型上的属性
function getContent1(proto, key, descriptor) {
  console.log('-------------------------------------')

  console.log({
    'Search原型': proto,
    '所修饰的属性': key,
    '装饰器对象': descriptor
  });
  console.log(descriptor.value()); //得到方法的返回值“原型上的属性”
}
// 装饰器decorator - 装饰原型上的属性 - 相当于李四的代码
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



let oS = new Search();
console.log(oS.url)

onInput.oninput = function (e) {
  oS.keyValue = this.value;
}

oBtn.onclick = function () {
  // 模拟发送请求
  let rst = oS.getContent('参数1','参数2');//此时再调用的就是装饰器getContent2里边修改的descriptor.value()方法了。
  console.log('getContent返回值',rst)
}

// 装饰器decorator - 装饰原型上的属性 - 相当于李四的代码
function getContent2(proto, key, descriptor) {
  console.log('第2个装饰器？--可以！！！添加李四的代码功能');
  descriptor.writable = false;
  var oldgetContent = descriptor.value;//先存
  var count = -1;//因为初始化就会调用一次
  descriptor.value = function(){//后重写
    // console.log(this);//下边oS调用，this指向oS
    count++;
    console.log(count,'埋点计数被执行，发送到别的服务器做热力图用。。。');
    // return oldgetContent.call(this,arguments[0],arguments[1]); //代理实现 - call需要传多个参数
    return oldgetContent.apply(this,arguments); //代理实现。apply自动把所有参数集合到数组中传过去
  }
}