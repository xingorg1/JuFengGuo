async function async1() {
  console.log('async start');
  await async2(); // 这里犹豫了，对async、await掌握还是不牢固。不就是一个promise的语法糖么，这么一想答案就出来了。
  console.log('async end');
}

async function async2(){
  console.log('async2');
}
console.log('script start');

setTimeout(() => {
  console.log('setTimeout 0');
}, 0)

setTimeout(() => {
  console.log('setTimeout 3');
}, 3)

setImmediate(() => {
  console.log('setImmediate');
})

process.nextTick(() => {
  console.log('nextTick');
})

async1();

new Promise((res) => {
  console.log('promise1');
  res();
  console.log('promise2');
}).then(() => {
  console.log('promise 3');
});

console.log('script end');


/**
script start
async start
async2
promise1
promise2
script end

nextTick
async end
promise 3

// 后边这仨的运行顺序就是验证你电脑运算速度的时候了。
速度最好（执行上边的同步代码 + 微任务 + 计时器运算用了不到0ms）：
setImmediate
setTimeout 0
setTimeout 3

速度中等（执行上边的同步代码 + 微任务 + 计时器运算用了0~3ms以上）：
setTimeout 0
setImmediate
setTimeout 3

速度较差（执行上边的同步代码 + 微任务 + 计时器运算用了3ms以上）：
setTimeout 0
setTimeout 3
setImmediate
*/