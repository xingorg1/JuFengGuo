// console.time();
// process.nextTick(() => {
//   console.log('nextTick1');
//   console.time('nextTick1');
// })
// setTimeout(() => {
//   console.log('setTimeout 1000');
//   console.time('setTimeout 1000');
//   process.nextTick(() => {
//     console.log('nextTick 1000');
//     console.time('nextTick 1000');
//   })
// }, 1000)

// setTimeout(() => {
//   console.log('setTimeout 2000');
//   console.time('setTimeout 2000');
//   process.nextTick(() => {
//     console.log('nextTick 2000');
//     console.time('nextTick 2000');
//     console.timeEnd();
//   })
// }, 2000)

console.log(new Date());
process.nextTick(() => {
  console.log('nextTick1');
  console.log(new Date());
})
setTimeout(() => {
  console.log('setTimeout 1000');
  console.log(new Date());
  process.nextTick(() => {
    console.log('nextTick 1000');
    console.log(new Date());
  })
}, 1000)

setTimeout(() => {
  console.log('setTimeout 2000');
  console.log(new Date());
  process.nextTick(() => {
    console.log('nextTick 2000');
    console.log(new Date());
  })
}, 2000)