// 导入
// import { myName, Person, name1, name2 } from './export.js'
// console.log(myName, Person, name1, name2)

// 给导入的具名符号重命名
// import { myName as yourName, name1} from './export.js'
// console.log(myName) // ReferenceError: myName is not defined
// console.log(yourName, name1) // 得到正常导出的值

// 将所有导出内容，汇集到一个对象中
import * as params from './export.js'
console.log(params, params.name1) // 得到一个常量变量，变量的值是export.js导出的所有变量合集