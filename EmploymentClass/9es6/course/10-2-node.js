/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-22 14:07:55 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-26 23:46:31
 */
let fs = require('fs'); // node中读取文件的一个对象，对象上有各种读取文件的方法

/* 1 回调地狱 */
/* let fileUrl = './data/one.txt';//在这个路径下的相对路径 PS E:\gjf-github\jsStudy\Duying\EmploymentClass\9es6>
fs.readFile(fileUrl,'utf-8',(err,data)=>{
  //error-first模式，node中的回调函数基本遵循这个格式。就是回调的第一个参数是错误参数.
  console.log(1, err,data);
  fs.readFile(data,'utf-8',(err,data)=>{
    console.log(2, data);
    fs.readFile(data,'utf-8',(err,data)=>{
      console.log(3, data);
      // 。。。回调地狱
    });
  });
}); */

/* 2 监听并发 */
const {
  log
} = console;
let fileUrl1 = '../data/one.txt';
let fileUrl2 = '../data/two.txt';
let fileUrl3 = '../data/three.txt';
let readFileRst = {}
let order = []; //记录三个文件的完成顺序
function readFileEnd(data) {
  // 待三个readFile都执行后再触发我
  console.log('readFile都执行了 ', data, order);
}
fs.readFile(fileUrl1, 'utf-8', (err, data) => {
  if (data) readFileRst.one = data;
  order.push(1);
  // 每次读取成功都判断一下对象里是否存够三个属性了，成立则执行最终函数
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst);//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst)
});

fs.readFile(fileUrl3, 'utf-8', (err, data) => {
  if (data) readFileRst.three = data;
  order.push(3);
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst) ;//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst, '第二个参数')
});

fs.readFile(fileUrl2, 'utf-8', (err, data) => {
  if (data) readFileRst.two = data;
  order.push(2);
  // Object.keys(readFileRst).length == 3 && readFileEnd(readFileRst);//第一次自己调用时计数
  // afterFun(readFileRst);// 第二次使用after订阅
  Store.fire(readFileRst)
});
// 优化 after计数
function after(times, cb) {
  return function () {
    --times == 0 && cb.apply(null, arguments);
  }
}
let afterFun = after(3, readFileEnd);
// 这样的after只能传一个readFileEnd，且只能执行一个定好的readFileEnd。如果想新增就不行。

/* 3 引入promise原理 - 发布订阅设计模式：修改优化上边代码 */
let Store = {
  // 目的，对回调进行很好的管理 
  list: [], //存储被订阅的函数
  times: 3, //计数
  subscribe(func) {
    // 订阅一些函数
    this.list.push(func);
  },
  fire(...args) {
    // 触发时，调用订阅的所有函数。
    if (--this.times === 0)
      this.list.forEach((ele) => {
        ele.apply(null, args); //依次触发所有函数
      })
  }
}
// Store.subscribe(readFileEnd);//订阅2
// Store.subscribe(readFileEnd2);//订阅2
// Store.subscribe(readFileEnd3);//订阅3

function readFileEnd2(a) {
  // 新增几个并发后的回调函数
  console.log('readFile2执行', a);
}

function readFileEnd3(b, c) {
  // 新增几个并发后的回调函数
  console.log('readFile3执行', b, c);
}


// 使用promise解决
function promiseReadFile(urlLink) {
  return new Promise((res, rej) => {
    fs.readFile(urlLink, 'utf-8', (err, data) => {
      if (data) {
        res(data);
      } else {
        rej(err)
      }
    });
  });
}
promiseReadFile(fileUrl1).then((data2) => {
  return promiseReadFile(data2); //return出去一个promise对象
}, (err) => {
  log(err)
}).then((data3) => {
  return promiseReadFile(data3); //return出去一个promise对象
}, (err) => {
  log(err)
}).then((endData) => {
  log('promise得到最后结果', endData)
}, (err) => {
  log(err)
});


// 生成器改写异步回调 - 蛇形走位
function genePromiseRF(urlLink) {
  return new Promise((res, rej) => {
    fs.readFile(urlLink, 'utf-8', (err, data) => {
      if (data) {
        res(data);
      } else {
        rej(err);
      }
    });
  });
}

function* generator(data) {
  // 期望yield产出一个promise对象
  let one = yield genePromiseRF(data);
  let two = yield genePromiseRF(one);
  return yield genePromiseRF(two);
}

let iteratorObj = generator(fileUrl1); //初始化时，把第一个url传入进去，得到一个迭代对象，里边有next方法

// 老师的写法

let {//老师这里通过解构赋值把value给单独拿出来了。
  value,
  done
} = iteratorObj.next(fileUrl2);//调用next方法后得到一个结果对象，结果对象中有value值，是genePromiseRF调用后的promise对象。
// 这里特殊关注，因为蛇形走位的特点，next中传入的参数是对应yield产出结果时，其赋值变量的结果。比如这里第一次let iteratorObj，先执行第一个yield。然后调用iteratorObj.next(fileUrl2);时执行let one和第二个yield。具体看generator的"蛇形走位"吧.
value.then((da2) => {//调用promise对象的then，拿到res(data);的结果值da2，是一个路径，我们直接当参数再传进next中
  let {
    value,
    done
  } = iteratorObj.next(da2);//再次结构next调用后返回的对象。
  value.then((da3) => {
    let {
      value,
      done
    } = iteratorObj.next(da3);
    value.then((da4) => {
      log('generator生成器结果', da4);
    });
  });
});

// 我的写法
/* iteratorObj.next(fileUrl2).value.then((da2) => {
    return iteratorObj.next(da2).value
  })
  .then((da3) => {
    return iteratorObj.next(da3).value
  })
  .then((da4) => {
    log('generator生成器结果', da4);
  });
 */
// 生成器改写异步回调 - 蛇形走位 - 改进上面得代码

// Generator + promise + readFile + Co
function newGneraProRF(urlLink) {
  return new Promise((res, rej) => {
    fs.readFile(urlLink, 'utf-8', (err, data) => {
      if (data) {
        res(data);
      } else {
        rej(err);
      }
    });
  });
}

function* generator2(data) {
  let one = yield newGneraProRF(data);
  let two = yield newGneraProRF(one);
  return yield newGneraProRF(two);
}

function myCoOld(iteratorObj){
  // generator调用，yield产出一个iterator迭代对象。
  return new Promise((res,rej)=>{
    let {value, done} = iteratorObj.next();
    value.then((rst)=>{
      // res(rst);
      let {value, done} = iteratorObj.next(rst);
      value.then((rst)=>{
        // res(rst);
        let {value, done} = iteratorObj.next(rst);
        value.then((rst)=>{
          res('co的最终结果 - '+ rst);
        },rej)
      },rej)
    },rej)
  });
}
// 针对上边的嵌套循环，我们完全可以
function myCo(iteratorObj){
  return new Promise((res,rej)=>{
    let next = (data) =>{
      let {value, done} = iteratorObj.next(data);
      if(done){
        return res(value);// 如果迭代完毕，触发Co的promise resolve状态。传出最终的结果
      }
      value.then((rst)=>{ // 迭代对象的value是一个promise对象，promise对象成功时触发了then第一个回调。
        next(rst); // 在第一个回调中，递归执行下一个迭代。
      },rej);// 如果失败了，直接触发Co的promise reject状态。
    }
    next();// 第一次调用next
  });
}

// 期望Co调用返回一个Promise对象，然后then回调拿到最终结果
/* // myCoOld( generator2(fileUrl1) ) //一、使用自己的嵌套回调 - 全手工发展
myCo( generator2(fileUrl1) ) // 二、改成递归调用 - 机械化发展
.then((data)=>{
  log('Go最终拿到的结果就是 ', data);
},(err)=>{
  log(err);
}); */


// Promise + Generator + co
//需要先安装： npm i co
let co = require('co');
co( generator2(fileUrl1) ) // 三、使用现成的Co工具库，自动化发展
.then((data)=>{
  log('Go最终拿到的结果就是 ', data);
},(err)=>{
  log(err);
});



