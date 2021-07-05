setTimeout(() => {
  console.log('setTimeout 100');
  setTimeout(() => {
    console.log('setTimeout 100 - 0');
    process.nextTick(() => {
      console.log('nextTick in setTimeout 100 - 0');
    })
  }, 0)
  setImmediate(() => {
    console.log('setImmediate in setTimeout 100');
    process.nextTick(() => {
      console.log('nextTick in setImmediate in setTimeout 100');
    })
  });
  process.nextTick(() => {
    console.log('nextTick in setTimeout100');
  })
  Promise.resolve().then(() => {
    console.log('promise in setTimeout100');
  })
}, 100)

const fs = require('fs')
fs.readFile('./1.poll.js', () => {
  console.log('poll 1');
  process.nextTick(() => {
    console.log('nextTick in poll ======');
  })
})

setTimeout(() => {
  console.log('setTimeout 0');
  process.nextTick(() => {
    console.log('nextTick in setTimeout');
  })
}, 0)

setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('promise in setTimeout1');
  })
  process.nextTick(() => {
    console.log('nextTick in setTimeout1');
  })
}, 1)

setImmediate(() => {
  console.log('setImmediate');
  process.nextTick(() => {
    console.log('nextTick in setImmediate');
  })
});

process.nextTick(() => {
  console.log('nextTick 1');
  process.nextTick(() => {
    console.log('nextTick 2');
  })
})

console.log('global ------');


Promise.resolve().then(() => {
  console.log('promise 1');
  process.nextTick(() => {
    console.log('nextTick in promise');
  })
})

/**
global ------
nextTick 1
nextTick 2
promise 1
nextTick in promise
setTimeout 0 // 解释问题1. 没有上边的nextTick和promise，setTimeout和setImmediate的顺序不一定，有了以后肯定是0先开始。可见，走一个球之前，就先检查并执行了nextTick和promise微队列
nextTick in setTimeout
setTimeout 1
nextTick in setTimeout1
promise in setTimeout1
setImmediate
nextTick in setImmediate
poll 1
nextTick in poll ======
setTimeout 100
nextTick in setTimeout100
promise in setTimeout100
setImmediate in setTimeout 100
nextTick in setImmediate in setTimeout 100
setTimeout 100 - 0
nextTick in setTimeout 100 - 0
 */
