/*
 * @Author: @Guojufeng 
 * @Date: 2019-01-12 21:18:38 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-27 21:20:57
 * 原型方法仿写
 * 包括：Function 、Array 、 Map 、 Promise
 */

/* Function各种方法仿写 */
// call
Function.prototype.gjfCall = function () {
  var rst = null,
    obj = arguments[0] || window,
    len = arguments.length,
    argArr = [];
  for (let i = 1; i < len; i++) {
    argArr.push('arguments[' + i + ']');
    //这里也可以用reduce的思想，但是用reduce会用到Array原型上的call方法，故而放弃。
  }
  obj.targetFunc = this;
  console.log(argArr, argArr.join());
  rst = eval('obj.targetFunc(' + argArr.join() + ')');
  delete obj.targetFunc;
  return rst;
}
// call的es6写法
Function.prototype.gjfCallES6 = function () {
  var rst = null,
    obj = arguments[0] || window,
    args = [...arguments].slice(1); //将参数集合成数组，并去掉第一个参数（第一个参数表示调用者的this绑定目标）
  // 要判断obj是不是原始值【*】
  obj['targetFunc'] = this; //将调用者存到this绑定目标这个对象上
  rst = obj['targetFunc'](...args); //this绑定的本质是谁调用指向谁。所以用this绑定目标对象调用当前调用者函数。身份转换。需要想通。
  delete obj['targetFunc'];
  return rst;
}
// apply
Function.prototype.gjfApply = function (obj, array) {
  var newObj = arguments[0] || window,
    len = arguments[1] && arguments[1].length,
    targetFunc = this.name,
    argArr = [],
    rst = null;
  obj.targetFunc = this;
  if (arguments[1]) {
    for (var i = 0; i < len; i++) {
      argArr.push('arguments[1][' + i + ']');
    }
    rst = eval('obj.targetFunc(' + argArr.join() + ')');
  } else {
    rst = obj.targetFunc();
  }
  delete obj.targetFunc;
  return rst;
}
// bind
Function.prototype.gjfBind = function (target) {
  var self = this,
    _args = Array.prototype.slice.call(arguments, 1);
  var temp = function () {};
  var f = function () {
    var _arg = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof temp.prototype ? this : (target || window), _args.concat(_arg));
  }
  temp.prototype = self.prototype;
  f.prototype = new temp();
  return f;
}
/* Object的各种方法仿写 */
// toString
Object.prototype.gjfToString = function (q) {
  // console.log(q)
  var type = this.constructor; //直接这么写，undefined或null时this指向window，这是call的问题。当call第一个参数是undefined\null\空时，this在非严格模式走默认指向window,当call第一个参数是math的时候是一个对象，没有constructor、导致沿着原型链找到Object
  // 第一个参数被call拿走当函数调用者了。难道要重新封装call吗？

  // if(arguments[0] === undefined){//undefined == null,所以这里需要全等
  //   return `[object Undefined]`;
  // }else if(arguments[0] === null){
  //   return `[object Null]`;
  // }else{
  return `[object ${type.name}]`;
  // }
}

/* -------------------------------------------------------------------------------------- */

/* Array的各种方法仿写 */
/* 新增方法 */
Array.prototype.flatten = function () {
  return this.reduce((pre, cur) => {
    return Object.prototype.toString.call(cur) === '[object Array]' ? pre.concat(cur.flatten()) : pre.concat(cur);
  }, []);
}
/* 重写方法 */
// push
Array.prototype.gjfPush = function () {
  for (var key in arguments) {
    this[this.length] = arguments[key];
  }
  return this.length;
}
// pop
Array.prototype.gjfPop = function () {
  var arr = [],
    len = this.length - 1,
    popResult = this[len];
  for (let i = 0; i < len; i++) {
    //深度拷贝原数组
    arr.push(this[i]);
  }
  this.length = 0; //利用length = 0, 把原数组清空
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return popResult; //功能：返回踢掉的值
}
Array.prototype.gjfPop2 = function () {
  var result;
  if (this.length) {
    result = this.length - 1;
    this.length--;
  }
  return result;
}
// shift
Array.prototype.gjfShift = function () {
  var arr = [],
    len = this.length,
    result = this[0];
  for (let i = 1; i < len; i++) {
    arr.push(this[i]);
  }
  this.length = 0;
  for (let i = 0; i < len - 1; i++) {
    this.push(arr[i]);
  }
  return result;
}
// unshift
Array.prototype.gjfUnshift = function () {
  var arr = [],
    tLen = this.length;
  aLen = arguments.length;
  for (let i = 0; i < tLen; i++) {
    arr.push(this[i]); //储备原数组
  }
  this.length = 0; //清空原数组
  for (let i = 0; i < aLen; i++) {
    this.push(arguments[i]); //空原数组先加参数值
  }
  for (let i = 0; i < tLen; i++) {
    this.push(arr[i]); //原数组再合成原始值
  }
  return this.length; //返回数组长度
}
// unshift利用concant
Array.prototype.gjfUnshift2 = function () {
  /* 
    思路，用户传进来的是一个arguments类数组，转成真数组：Array.prototype.slice.call(arguments)
    然后和现有数组concant连接即可。因为是unshift，所以让新数组使用concant来连接旧数组this
  */
  var arr = Array.prototype.slice.call(arguments).concat(this),
    arrLen = arr.length;
  this.length = 0;
  for (let i = 0; i < arrLen; i++) {
    this.push(arr[i]); //重新整理原数组
  }
  return this.length; //返回数组长度
}
// join
Array.prototype.gjfJoin = function () {
  var targetStr = arguments[0],
    str = ',',
    result = this[0],
    len = this.length;
  if (targetStr !== undefined) {
    if (targetStr === null) {
      str = 'null'
    } else {
      str = targetStr.toString();
    }
  }
  for (let i = 1; i < len; i++) {
    if (this[i] !== undefined && this[i] !== null) {
      result += (str + this[i]);
    } else {
      result += str;
    }
  }
  return result;
}
// concat
Array.prototype.gjfConcat = function () {
  let arr = [], //因为不能重写原数组，所以新建
    len = this.length,
    aLen = arguments.length;
  for (let i = 0; i < len; i++) {
    arr.push(this[i]);
  }
  for (let i = 0; i < aLen; i++) {
    if (Object.prototype.toString.call(arguments[i]) == '[object Array]') {
      // 数组，要展开推入进去：多维数组只展开第一层
      let arrLen = arguments[i].length;
      for (let j = 0; j < arrLen; j++) {
        arr.push(arguments[i][j]);
      }
    } else {
      // 非数组，直接push进去连接
      arr.push(arguments[i]);
    }
  }
  return arr;
}
// reverse
Array.prototype.gjfReverse = function () {
  var arr = [],
    len = this.length;
  for (let i = 0; i < len; i++) {
    arr.push(this[len - 1 - i]); //实现倒着push1
  }
  this.length = 0;
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return arr;
}
Array.prototype.gjfReverse2 = function () {
  var arr = [],
    len = this.length;
  for (let i = len - 1; i >= 0; i--) {
    arr.push(this[i]); //实现倒着push2
  }
  this.length = 0;
  for (let i = 0; i < len; i++) {
    this.push(arr[i]);
  }
  return arr;
}
// forEach
Array.prototype.gjfForEach = function (fn) {
  var _arr = this,
    len = this.length,
    params02 = arguments[1] || window; //this函数执行时的指向（严格模式指向undefined怎么办？）
  for (let i = 0; i < len; i++) {
    fn.apply(params02, [_arr[i], i, _arr]);
  }
  return 'author:@guojufeng';
}
// filter
Array.prototype.gjfFilter = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    resultArr = [];
  for (let i = 0; i < len; i++) {
    fn.apply(self, [_arr[i], i, _arr]) ? resultArr.push(_arr[i]) : 'author:@guojufeng';
  }
  return resultArr;
}
// map
Array.prototype.gjfArrayMap = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    newArr = [];
  for (let i = 0; i < len; i++) {
    newArr.push(fn.apply(self, [_arr[i], i, _arr]));
  }
  return newArr;
}
// every
Array.prototype.gjfEvery = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    result = true;
  for (let i = 0; i < len; i++) {
    if (!fn.apply(self, [_arr[i], i, _arr])) {
      return false; //一旦不符合条件，立即返回，不再执行接下来的内容。
    }
  }
  return result;
}
// some
Array.prototype.gjfSome = function (fn) {
  var _arr = this,
    len = this.length,
    self = arguments[1] || window,
    result = false;
  for (let i = 0; i < len; i++) {
    if (fn.apply(self, [_arr[i], i, _arr])) {
      return true;
    }
  }
  return result;
}
// reduce
Array.prototype.gjfReduce = function (fn, initValue) {
  var _arr = this,
    len = this.length,
    self = arguments[2] || window, //我们给他添加重新指向this的功能
    prevValue = initValue;
  for (let i = 0; i < len; i++) {
    prevValue = fn.apply(self, [prevValue, _arr[i], i, _arr]);
    //本次的prevValue就是上一次函数调用的返回值。而，函数每一次调用传入的prevValue就是上一次自己的返回值。
  }
  return prevValue; //返回最后一次遍历后，得出的结果值。
}
// reduceRight
Array.prototype.gjfReduceRight = function (fn, initValue) {
  var _arr = this,
    len = this.length - 1,
    self = arguments[2] || window, //我们给他添加重新指向this的功能
    prevValue = initValue;
  for (let i = len; i >= 0; i--) {
    prevValue = fn.apply(self, [prevValue, _arr[i], i, _arr]); //本次的prevValue就是上一次函数调用的返回值。而，函数每一次调用传入的prevValue就是上一次自己的返回值。
  }
  return prevValue; //返回最后一次遍历后，得出的结果值。
}

/* -------------------------------------------------------------------------------------- */

/* Map模拟 */
// Map构造函数
function gjfMap() {
  this.bucketLength = 8; // 定义桶的长度为8（也就是数组中8个对象来放值用）
  this.init(); //初始化开始
}
// init
gjfMap.prototype.init = function () {
  // 创建map中的桶，桶里有特定个数的对象，对象中有next以实现链表
  this.bucket = new Array(this.bucketLength);
  for (let i = 0; i < this.bucketLength; i++) {
    // 桶里边放桶长度个数的空对象（小节），每个空对象里一个初始化next，指向空null
    this.bucket[i] = {
      type: 'bucket' + i, //桶中小节的名字
      next: null
    };

  }
}
// makehash - 计算hash值得算法。目的是分散放置key，不至于让桶中某一小节的对象后边的链条非常长，一直next->next的放。这种相对平均的分布一下hash，争取让不同的值对应不同的小节对象上。如果这么放还是会使得某一小节过长的话，可以增加桶的长度，再扩大hash值得范围。
gjfMap.prototype.makehash = function (key) {
  let hash = 0;
  // 把不定范围的值转成特定范围的值，这里的作用是，将不同类型的值通过一个算法，按照一定的规律计算得出不同的代表号。再按照这个号码放到桶的对应标号小节（bucket1 || bucket2等）中
  // 接收一个参数，参数为map要set值得key值，判断这个key值得类型，计算出hash编号，hash范围是[0,this.bucketLength)。
  // *注意：重复算同一个key值，得到的hash值应该是固定的。
  // key可能的值：string、number、boolean、NaN(特殊处理)、undefined、null、Object、array、function、date、regexp...(这些值在map中都可以作为属性值存在)
  if (typeof key !== 'string') {
    if (typeof key === 'number') {
      // key是数字类型,直接让hash值等于这个key值。如果是NaN，特殊让hash等于7（看心情赋值）
      hash = Object.is(key, NaN) ? 7 :
        key; //是否是NaN判断这里用了Object提供的新方法is()，他是严格全等判断。不过也可以用字符串判断：key+'' === 'NaN';也可以进行判断
    } else if (typeof key === 'object') {
      // key是对象 null、Object、array、date、regexp..,设置为固定值。
      hash = 5;
    } else if (typeof key === 'boolean') {
      // key是布尔
      hash = +key; //利用+号的隐式类型转换，true会转为1，false转为0。或者可以用Number(key)转成数字
    } else if (typeof key === 'function') {
      // key是函数
      hash = 2;
    } else {
      // 其他情况 null、undefined等
      hash = 0;
    }
  } else {
    // key 是 string 类型时，因为字符串的长度和内容是不定的，所以我们人为的定一个规则，只取字符串中前三/后三位字符，然后对截取的字符进行ASCII码转换后，累加ASCII码再%8得到[0,8)的hash值。目的只是为了得到[0,8)的hash值,规则可以另改。。。
    for (let i = 0; i < 3; i++) {
      //中括号在字符串中的用法：'abc'[0] => 'a';'abc'[1] => 'b';'abc'[2] => 'c';
      //'abc'[0].charCodeAt(0) => 可以得到字符a的ASCII码，后边b、c改下标即可。
      //'abc'.charCodeAt(1) => 可以取到前边字符串第二个字符的ASCII码。
      hash += key[i] ? key[i].charCodeAt(0) : 0; //注意当字符长度小于3时，做一下容错处理,如果对应索引有字符，就累加该字符的ASCII码，如果没有就累加0.
    }
  }
  return hash % 8; //让最终的hash值对8取余，得到[0,8)的hash值
}
// set - 放置就是一个查找链表的过程
gjfMap.prototype.set = function (key, value) {
  let hash = this.makehash(key); //得到这个key值需要存放的几号对象小节，就好像一个公寓楼里，要把它放到第几层一样。
  let oTempBucket = this.bucket[hash]; //找到桶数组中的第hash个数组，并存到临时小节中。
  while (oTempBucket.next) { //gjfMap中放第一个key value时，这个条件一定不成立，因为next初始化为null，所以会跳过循环走下边的直接赋值。
    // oTempBucket = oTempBucket.next;// 如果第一个next中有对象了，就把这个临时小节换成本小节的next，一直递归下去，直到当前对象的next为null时，也就是找到了当前链表上的最后一个next，然后跳出循环。
    if (oTempBucket.key === key) { //但是也不一定是非要放到最后一个，我们这是设置值，加入这个值已经被设置过了，再次设置就需要覆盖了，所以在递归过程中如果遇到了相同的key，就直接赋值并跳出。
      oTempBucket.value = value;
      return false; //覆盖值后，直接返回，不再走下边的逻辑。
    } else {
      oTempBucket = oTempBucket.next; // 如果key不存在，那么就递归找到链表最末尾的对象
    }
  }
  oTempBucket.next = { //第一次跳过循环直接赋值，后几次因为oTemoBucket被重新赋值，所以他是oTempBucket.next.next了，递归思路。永远是链条上最后一个对象。
    key: key,
    value: value,
    next: null,
  }
}
// get
gjfMap.prototype.get = function (key) {
  let hash = this.makehash(key); //获取到要取的key的hash，好去对应标号为hash的对象上找到他。
  let oTempBucket = this.bucket[hash]; //取到key所在的hash编号对象上。
  while (oTempBucket) { //递归查找，判断当前对象小节是否有值
    if (oTempBucket.key === key) { //如果有就判断这个对象上的key是不是要找的。
      return oTempBucket.value; //是就返回对应值
    } else { //不是，就把查找的对象替换一下，替换成链表的下一节。
      oTempBucket = oTempBucket.next;
    }
  }
  return undefined; //最终什么也没找到，返回undefined；
}
// delete
gjfMap.prototype.delete = function (key) {
  let hash = this.makehash(key);
  let oTempBucket = this.bucket[hash];
  while (oTempBucket.next) { //先看下一个有没有值
    if (oTempBucket.next.key === key) { //如果是我要删的值
      oTempBucket.next = oTempBucket.next.next; //就架空当前key所在对象 即 对象.next指向的那个对象，让对象.next指向next.next。这里有点绕，画图解决。
      return true; //删除成功
    } else {
      oTempBucket = oTempBucket.next; //不是目标删除值，就下移一层，再做递归判断。
    }
  }
  return false; //没有删除 || 没得删除
}
// has
gjfMap.prototype.has = function (key) {
  let hash = this.makehash(key); //获取到要取的key的hash，好去对应标号为hash的对象上找到他。
  let oTempBucket = this.bucket[hash]; //取到key所在的hash编号对象上。
  while (oTempBucket) { //递归查找，判断当前对象小节是否有值
    if (oTempBucket.key === key) { //如果有就判断这个对象上的key是不是要找的。
      return true; //是就返回对应值
    } else { //不是，就把查找的对象替换一下，替换成链表的下一节。
      oTempBucket = oTempBucket.next;
    }
  }
  return false; //最终什么也没找到，返回undefined；
}
// clear
gjfMap.prototype.clear = function () {
  this.init(); //重新建立一个new Map()、或者干脆直接初始化
}


/* -------------------------------------------------------------------------------------- */
/* Promise的仿写与实现 */
function GjfPromise(executor) {
  var self = this;
  this.status = 'pending'; //默认一开始的状态是pending，后期一旦改变不能再改
  this.resolveValue = null;
  this.rejectReason = null;
  this.resolveStack = []; //异步任务的成功任务 回调集合 - 模拟任务队列
  this.rejectStack = []; //异步任务的失败任务 回调集合 - 模拟任务队列
  if (!(this instanceof GjfPromise)) {
    //原生promise必须用new调用，否则抛出错误
    throw new TypeError('undefined is not a promise');
  }
  if (typeof executor !== 'function') {
    //防止Promise调用时不传参/参数不是一个函数
    throw new TypeError('GjfPromise resolver undefined is not a function');
  }
  /* executor传递两个参数进入promise的参数函数中 */
  function resolve(value) { //外边res调用的时候，resolve或reject也会接收参数，并传给下一个then使用
    if (self.status === 'pending') {
      //状态转换
      self.status = 'fulfilled';
      self.resolveValue = value; //储存回调参数，给下一个then用
      // 如果是pending -> fulfilled时stack里有值，说明存储过异步任务，进行触发：
      self.resolveStack.forEach(function (ele) {
        ele(); //逐个触发成功的异步任务
      });
    }
  }

  function reject(reason) {
    if (self.status === 'pending') {
      //状态转换
      self.status = 'rejected';
      self.rejectReason = reason;
      // 如果是pending -> rejected时stack里有值，说明存储过异步任务，进行触发：
      self.rejectStack.forEach(function (ele) {
        ele(); //逐个触发失败的异步任务
      });
    }
  }
  try {
    // promise调用后，参数函数executor里边抛出错误需要捕获并传给下一个then的错误回调。
    executor(resolve, reject);
  } catch (err) {
    // 接住错误并触发状态改变、存储错误信息。
    // 遇到错误时流程走到then的错误回调，相当于触发rej，错误回调的参数是错误信息
    reject(err);
  }
}
// GjfPromise 静态方法
// all
GjfPromise.all = function (promiseArr) {
  var len = promiseArr.length,
    resValueArr = [];
  return new GjfPromise(function (res, rej) {
    promiseArr.forEach(function (promiseObj) {
      if(promiseObj instanceof GjfPromise){
        promiseObj.then(function (resValue) {
          dealRes(resValue);
        }, rej);//遍历过程汇总遇到一个失败，立即触发rej，原理同race了。
      }else{
        // 加容错处理，如果参数列表中有非promise值则直接运行res，并把这个参数直接传到输出数组
        dealRes(promiseObj);
      }
      function dealRes(resValue){
        // 如果遍历过程中，参数列表里边的其中一个promise对象触发了自己的res，我们就在then中接收并记录他的参数，顺便把完成的数量+1(那么未完成的promise对象就是 总数-1 了，所以我这里用了--len),len本来是总的数量，等于0时代表所有promise对象完成，我们就触发all后边then的成功回调。
        resValueArr.push(resValue);
        // 发现这么做，最后输出数组的顺序有误，原始值不是异步代码会被push到最前边。。。
        --len === 0 && res(resValueArr);
      }
    });
  });
}
// race
GjfPromise.race = function (promiseArr) {
  // race返回promise对象。后边可以继续then调用
  return new GjfPromise(function (res, rej) {
    promiseArr.forEach(function (promiseObj) {
      //遍历所有的promise对象，都绑定一个then函数，如果一个promise执行完毕就会调用这个then。相当于我们平时这样的写法：
      /* var promise = new Promise((resv,rejt)=>{
        resv(1); || rejt(1);
      });
      promise.then((data)=>{
        log(data)
      },(err)=>{
        log(err);
      })
      上边resv or rejt不管谁调用，就会触发下边promise.then里边的对应回调。而两个函数参数对应的就是我们下边的res和rej这俩。这里有个中间媒介、代理的感觉。需要多思考一会。
       */
      if(promiseObj instanceof GjfPromise){
        // 加容错处理，如果参数列表中有非promise值则直接运行res
        promiseObj.then(res, rej);
      }else{
        res(promiseObj);
      }
    });
  });
}
// GjfPromise 原型
GjfPromise.prototype = {
  dealReturnPromise(returnValue, resol, rejec) {
    if (returnValue instanceof GjfPromise) {
      // 当上一个then的返回值是promise时，我们这里来调用他的then
      returnValue.then(function (value) {
        resol(value);
      }, function (reason) {
        rejec(reason);
      });
    } else {
      resol(returnValue);
    }
  },
  // then
  then(onFunfilled, onRejected) { //这俩名字是Promise规范命名
    //检查then的传参是否规范，是够是两个函数？或者只传了一个函数，或者reso传的是null？是否是空then(即reso或reje不传参时)等情况。
    if (typeof (onFunfilled) !== 'function') {
      onFunfilled = function (val) {
        // 透过去的本质，不是真正的忽视，而是你转交给我的东西，我原封不动的传到下一个中去。
        return val;
      }
    }
    if (typeof (onRejected) !== 'function') {
      onRejected = function (err) {
        // 透过去的本质，不是真正的忽视，而是你转交给我的东西，我原封不动的传到下一个中去。
        throw err;
      }
    }
    var _this = this,
      //创建一个新的promise对象，并把之前的代码当做同步代码穿进去
      newPromise = new GjfPromise(function (reso, reje) {
        // 检测不同的状态，触发不同的回调
        if (_this.status === 'fulfilled') {
          // 触发成功回调
          setTimeout(function () { //模拟then的微任务
            try {
              var lashResolveValue = onFunfilled(_this.resolveValue); // 记录上一个then的返回值
              // reso(lashResolveValue); //第一个then的resove触发，拿到返回值立即调用下一个then的resolve，并传参上一个then的返回值
              _this.dealReturnPromise(lashResolveValue, reso, reje);
            } catch (e) {
              reje(e); //如果捕获到错误，直接出发下一个then的失败回调
            }
          }, 0);
        }
        if (_this.status === 'rejected') {
          // 触发失败回调
          setTimeout(function () {
            try {
              var lashRejectValue = onRejected(_this.rejectReason);
              // reso(lashRejectValue);//这里注意，即使上一个then走的是失败回调，下一个也走成功回调
              _this.dealReturnPromise(lashRejectValue, reso, reje);
            } catch (e) {
              reje(e);
            }
          }, 0);
        }
        if (_this.status === 'pending') {
          //res还没触发的时候，就已经走了then了。所以在then里判断状态还是pending的话，就说明是异步任务。所以模拟两个栈来存放异步回调,等回调完毕触发res/rej的时候再执行之。
          _this.resolveStack.push(function () {
            setTimeout(function () {
              try {
                var lashResolveValue = onFunfilled(_this.resolveValue);
                // reso(lashResolveValue);
                _this.dealReturnPromise(lashResolveValue, reso, reje);
              } catch (e) {
                reje(e);
              }
            }, 0);
          });
          _this.rejectStack.push(function () {
            setTimeout(function () {
              try {
                var lashRejectValue = onRejected(_this.rejectReason);
                // reso(lashRejectValue);//这里注意，即使上一个then走的是失败回调，下一个也走成功回调
                _this.dealReturnPromise(lashRejectValue, reso, reje);
              } catch (e) {
                reje(e);
              }
            }, 0);
          });
        }

      });
    // 返回一个新的promise对象，方便链式调用
    return newPromise;
  },
  catch(onRejected){
    return this.then(null,onRejected);
  }
}