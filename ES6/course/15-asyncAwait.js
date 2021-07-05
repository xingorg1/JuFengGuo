// 回到这个阶段 - 使用promise解决多个异步问题。但是还是有回调地狱
let fs = require('fs');
let fileUrl1 = '../data/one.txt';
let fileUrl2 = '../data/two.txt';
let fileUrl3 = '../data/three.txt';
const {log} = console;
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

// 原先用promise处理的时候：
/* promiseReadFile(fileUrl1).then((data2) => {
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
}); */

/* // 以上代码用async和await处理:
async function read(url){//标志一个异步函数，应该是一个promise，因为调用后可以用then继续链式回调。
  try{
    let rst1 = await promiseReadFile(url);//等待promiseReadFile(url)执行完毕后，把结果给了rst1.
    let rst2 = await promiseReadFile(rst1);//等待promiseReadFile(rst1)执行完毕后，把结果给了rst2.
    let rst3 = await promiseReadFile(rst2);//等待promiseReadFile(rst2)执行完毕后，把结果给了rst3.
    return rst3;//rst3拿到结果后被吐出
  }catch(e){
    console.log('async的错误捕获',e)
  }
}
read(fileUrl1).then((data)=>{
  console.log(data);
},(err)=>{
  console.log(err);
}); */

// 同步并发异步结果的问题 (代替promise.all)
// all的一个问题是，所有的异步任务不能报错，全部成功调用才会触发then回调。否则只要有一个出错，就会走catch。
// 所以这里利用 async和await来处理
function readAll(data){
  async function read(){
    let val = null;
    try{
      val = await promiseReadFile(data);
      return val;
    }catch(e){
      console.log('async的错误捕获',e)
    }
  }
  return read;
}
let readAllEnd1 = readAll(fileUrl1);
let readAllEnd2 = readAll(fileUrl2);
let readAllEnd3 = readAll(fileUrl3);
function dealEnd (...args){
  args.forEach((ele)=>{
    ele().then((a)=>{
      log(12,a);
    });
  });
}
/* async function read1(){
  let val = null;
  try{
    val = await promiseReadFile(fileUrl1);
  }catch(e){
    console.log('async的错误捕获',e)
  }
}
async function read2(){
  let val = null;
  try{
    val = await promiseReadFile(fileUrl2);
  }catch(e){
    console.log('async的错误捕获',e)
  }
}
async function read3(){
  let val = null;
  try{
    val = await promiseReadFile(fileUrl3);
  }catch(e){
    console.log('async的错误捕获',e)
  }
};
dealEnd(read1,read2,read3);
*/

dealEnd(readAllEnd1,readAllEnd2,readAllEnd3)
console.log(readAllEnd1,readAllEnd2,readAllEnd3,102)
