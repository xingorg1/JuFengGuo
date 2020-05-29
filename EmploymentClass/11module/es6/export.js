// 导出
// 1、export 声明表达式
export const a = 1
export function myName() {
  console.log('函数声明或者变量声明')
}
export class Person {
  // ...
}
// 2、export {具名符号/变量名}
const name1 = '具名符号1'
const name2 = '变量2'
export { name1, name2 }

export { name1 as newName1 } // 导出重命名，被被人导入时名字叫做newName1