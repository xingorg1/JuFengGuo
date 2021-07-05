// 直接根目录执行 【tsc src/index.ts】 也行
let tuple: [string, number, boolean] = ['gjf', 10, true]
// 像元组中增加数据，只能增加元组中存放的类型
tuple.push('小石头')
console.log(tuple)

// 声明数组中元素数据类型
let arr1: number[] = [1, 2, 3]
let arr2: string[] = ['1', '2', '3']
let arr3: (number | string)[] = [1, '2', 3]
let arr4: Array<number | string> = [1, '2', 3] // 泛型方式来声明

// 枚举类型
enum USER_ROLE {
  USER, // 默认从0开始
  USER1 = 'user',
  ADMIN = 1,
  MANAGER,
}
// {0: "USER", 1: "ADMIN", 2: "MANAGER", USER: 0, ADMIN: 1, MANAGER: 2}
let a = USER_ROLE[0]
console.log(a)
console.log(USER_ROLE[1])
console.log(USER_ROLE.USER1)

const enum USER_ROLE1 {
  USER,
  ADMIN,
  MANAGER,
}
console.log(USER_ROLE1.USER) // console.log(0 /* USER */);


// let name1:number | boolean;
// name1 = null;

// const s1 = Symbol('key'); 