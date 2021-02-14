// 文件写入流
const fs = require('fs')
const path = require('path')

const fileName = path.resolve(__dirname, './demo.md')
// 返回一个WriteStream对象，是继承于Writeable的子类。Writeable里有的他都有。
const ws = fs.createWriteStream(fileName, {
  flag: 'a',
  encoding: 'utf-8',
  highWaterMark: 3 // 每次读取3个字节
})
// console.log(ws);

// 背压测试：
// 打印结果：前两次都是true，没有产生背压，后边再输入第三个字符后，通道满了，返回false。再后边继续输入，产生背压
let result = ws.write('a')
console.log(1, result); // 返回一个布尔值
result = ws.write('x')
console.log(result);
result = ws.write('i')
console.log(result);
result = ws.write('n')
console.log(result);
result = ws.write('g')
console.log(result);
result = ws.write('o')
console.log(result);
result = ws.write('r')
console.log(result);
result = ws.write('g')
console.log(result);