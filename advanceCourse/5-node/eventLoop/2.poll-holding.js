const startTime = new Date();

setTimeout(function f1() {
  console.log('setTimeout', new Date(), new Date() - startTime);
}, 200)

console.log('node 生命周期', startTime);

const fs = require('fs')

fs.readFile('./poll.js', 'utf-8', function fsFunc(err, data) {
  const fsTime = new Date()
  console.log('fs', fsTime);
  while (new Date() - fsTime < 300) {
  }
  console.log('结束死循环', new Date());
})

