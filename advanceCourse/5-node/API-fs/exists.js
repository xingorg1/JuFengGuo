// exists
// fs.exists 已经弃用了

const fs = require('fs')
const path = require('path')

const pathName = path.resolve(__dirname, '../API-global/index.js')
const rst = fs.existsSync(pathName) // 如果路径存在，则返回 true，否则返回 false。
console.log(pathName);
console.log(rst); // true

const pathName1x = path.resolve(__dirname, '../API-global/index11111.js')
const pathName1 = path.resolve(__dirname, '../API-global')
const rst1 = fs.existsSync(pathName1) // 如果路径存在，则返回 true，否则返回 false。
console.log(pathName1);
console.log(rst1); // false

// exists废弃了，我们自己利用stat封装一个
async function exists(path) {
  console.log(path)
  try {
    await fs.promises.stat(path)
    return true
  } catch (err) {
    console.log(err.code)
    if (err.code === 'ENOENT') { //  ENOENT （没有这样的文件或目录）
      return false
    }
    // 其他情况，直接抛出错误
    throw err;
  }
}
async function test() {
  const myExists = await exists(pathName)
  console.log(myExists);
  const myExists2 = await exists(pathName1x)
  console.log(myExists2);
}
test()
