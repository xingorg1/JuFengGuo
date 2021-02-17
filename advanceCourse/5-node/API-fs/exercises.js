// 1、读取一个目录中所有的子目录和文件。生成一个目录数组
function createPathArr(pathName) {
  let pathArr = []
  const fs = require('fs')
  const path = require('path')
  const pName = path.resolve(__dirname, pathName)
  const isHav = fs.statSync(pName)

  pathArr.push(pName)
  if (isHav.isDirectory()) {
    let rst = fs.readdirSync(pName)
    rst.forEach((elPath) => {
      let diguiArr = createPathArr(pathName + path.sep + elPath)
      pathArr = pathArr.concat(diguiArr)
    })
  }
  return pathArr

  // console.log(isHav.isDirectory());
  // console.log(isHav.isFile());
  // if (isHav.isFile()) {
  //   pathArr.push(pName)
  // }
}

// let rst = createPathArr('./one')
// console.log('最终结果', rst);




// 2、读取一个目录中所有的子目录和文件，生成每一个文件/目录对象，对象内需包含信息如下：
/* 
{
  * 属性
  fileName: 绝对路径
  name: 文件名
  ext: 后缀名，如果是目录，则该属性为空串
  isFile: 是否是一个文件
  size: 文件大小， 目录则为0
  createTime: 日期对象，创建时间
  updateTime: 日期对象，修改时间
  * 方法
  getChildren(): 得到目录的所有子文件对象，如果是文件，则返回空数组
  getContent(isBuffer = false): 读取文件内容，如果是目录，则返回null
}
 */

const fs = require('fs')
const path = require('path')
class File {
  constructor(fileName, name, ext, isFile, size, createTime, updateTime) {
    this.fileName = fileName // filename是返回文件的路径名还是绝对路径？
    this.name = name
    this.ext = ext
    this.isFile = isFile
    this.size = size
    this.createTime = createTime
    this.updateTime = updateTime
  }
  async getContent(isBuffer = false) {
    if (this.isFile) {
      if (isBuffer) {
        return await fs.promises.readFile(this.fileName)
      } else {
        return await fs.promises.readFile(this.fileName, 'utf-8')
      }
    }
    return null // 非文件无内容，返回null
  }
  async getChildren() {
    if (this.isFile) return [] // 文件无目录，返回空数组
    let children = await fs.promises.readdir(this.fileName)
    children = children.map(pathName => File.getFile(path.resolve(this.fileName, pathName))) // map 不改变源数组
    // console.log(children); // 得到一个promise的数组
    return Promise.all(children) // Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例
  }
  // “静态方法”: 不需要实例化类，即可直接通过该类来调用的方法
  static async getFile(pathName) {
    // console.log('this', this); // 静态方法包含this关键字，这个this指的是类，而不是实例。
    const fileName = path.resolve(__dirname, pathName)
    console.log(fileName);
    const stat = await fs.promises.stat(fileName)
    const name = path.basename(fileName)
    const ext = path.extname(fileName)
    const isFile = stat.isFile()
    const size = stat.isDirectory() ? 0 : stat.size
    const createTime = stat.birthtime
    const updateTime = stat.mtime
    return new File(fileName, name, ext, isFile, size, createTime, updateTime)
  }
}
async function myReadDir(pathName) {
  const fileRst = await File.getFile(pathName)
  return fileRst
}
async function test() {
  const dirName = './one'
  const fileName = './demo.md'
  // 获取文件信息
  const rstObj = await myReadDir(dirName)
  const rstObjFile = await myReadDir(fileName)
  console.log(rstObj);
  // console.log(rstObjFile);

  // 获取文件内容
  // const dirCont = await rstObj.getContent()
  // const fileCont = await rstObjFile.getContent()
  // const contBuffer = await rstObjFile.getContent(true)
  // console.log(fileCont);
  // console.log(dirCont);
  // console.log(contBuffer);

  // 获取文件子目录信息
  const dirDetail = await rstObj.getChildren()
  const fileDetail = await rstObjFile.getChildren()
  console.log('getChildren', dirDetail);
  const subDirDetail = await dirDetail[1].getChildren()
  console.log('subDirDetail', subDirDetail);
  console.log(fileDetail); // 文件的子目录，得到空数组
}
test()