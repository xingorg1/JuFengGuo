// 函数

// 函数声明
function hello(name: string): void {
  // return undefined // void，可以返回undefined，或不返回任何值
}

// 函数表达式
type GetUsernameFunction = (x: string, y: string) => string
let getUsername: GetUsernameFunction = function (firstName, lastName) {
  return firstName + lastName
}

/* 参数：可选、默认、剩余 */

// 可选参数 ?:
// 注意区分js里的可选链
function print(name: string, age?: number): void {}
print('gjf')
print('gjf', 90)

// 默认参数 =
function defu(name = 'gjf') {
  console.log(name)
}
defu()
defu('小石头')

// 剩余参数 ...
function sum(type: 'add' | 'minus', ...numbers: number[]) {
  return numbers.reduce((val, item) => (val += item), 0) // 柯里化实现
}
console.log(sum('add', 1, 2, 3))
console.log(sum('add', 1, 2))

// 函数重载
// 给同一个函数提供多个函数类型定义
function sumFn(val: string): string
function sumFn(val: number): number
function sumFn(val: any) {
  if (typeof val === 'string') {
    return val
  } else {
    return val
  }
}
sumFn('str')
sumFn(1)
