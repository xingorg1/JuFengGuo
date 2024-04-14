// 枚举类型
enum USER_ROLE {
  USER, // 默认从0开始
  USER1 = 'user', // 可以修改默认值
  ADMIN = 1,
  MANAGER,
}
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}
let a = USER_ROLE[0]
console.log(a)
console.log(USER_ROLE[1])
console.log(USER_ROLE.USER1)

console.log('====常数枚举====')
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。
const enum Colors {
  Red,
  Yellow,
  Blue,
}

let myColors = [Colors.Red, Colors.Yellow, Colors.Blue]
console.log(myColors)

// 假如包含了「计算成员」，则会在编译阶段报错
// const enum Color {Red = 'xv', Yellow = 1, Blue = "blue".length, Black = false};
