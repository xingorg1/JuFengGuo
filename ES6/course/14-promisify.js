/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-26 23:43:43 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-26 23:57:17
 * promise 化
 */
const {log}  = console;
let fs = require('fs');
// log(fs)
fs.readFile('../data/one.txt','utf-8',(err,data)=>{//error-first，这一点一定要注意，一开始写了一个参数得到null
  log('一、原生写法，不加修饰。',data);
});

// 为上边的readFile方法封装一个高阶函数，用于执行后返回一个promise对象
function promisify(funName){
  return function(...args){
    return new Promise((res,rej)=>{
      funName(...args,(err,data)=>{
        if(err){
          res(err);
          return false;
        }
        if(data){
          res(data);
        }
      });
    });
  }
}
let myReadFile = promisify(fs.readFile);
myReadFile('../data/one.txt','utf-8').then((data)=>{
  log('二、promisify工具 - promise化',data);
});

// promisefyAll - 批量化promise
function promisifyAll(obj){
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && typeof(obj[key]) === 'function') {
      // 判断key不是原型上的属性、且key对应的值是一个方法， 而不是一个基本类型的属性值。
      obj[key] = promisify(obj[key]);
    }
  }
}
// 把fs对象上的所有方法都重写一遍
promisifyAll(fs);
fs.readFile('../data/one.txt','utf-8').then((data)=>{
  log('三、promisifyAll - 统一整个对象',data);
});

