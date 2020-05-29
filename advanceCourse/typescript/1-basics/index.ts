// 类型约束 - 对变量、函数、参数、返回值的约束
let myname1: string = '类型定义为string';

function sum(a: number, b: number): number {
  return a + b
}

sum(1, 2)

let num1 = 1

let noTuidao;

// 基本类型
let num: number = 1;
let str: string = '字符串'
let bool: boolean = false

// 对象
let obj: object = {}

// 数组
let numArr: number[] = [1, 2, 3]
let strArr: string[] = ['1', '2', '3']
let boolArr: boolean[] = [false, true]

// 数组的第二种写法
let numArr2: Array<number> = [1, 2, 3]
let strArr2: Array<string> = ['1', '2', '3']
let boolArr2: Array<boolean> = [false, true]

// null和undefined
let numNull: number = null // 或undefined
let strNull: string = undefined // 或null
let boolNull: boolean = null
let numArrNull: number[] = [1, 2, null]
let strArrNull: string[] = ['1', undefined, null]
let boolArrNull: boolean[] = [undefined, null]

let nullVal: null = null // null值为null
let nullVal2: null = undefined // 也可以值为undefined
let undefinedVal: null = undefined // undefined值为undefined
let undefinedVal2: null = null // 也可以值为null

// 联合类型
let lianhe: string | number | undefined = '' // 可以使字符串、数字或undefined，用竖线链接

if (lianhe && typeof lianhe === 'string') {
  // 类型保护
} else if (lianhe && typeof lianhe === 'number') {
  // 类型保护2
} else {
  console.log('是一个undefined')
}

// void类型
function voidFun(): void {
  console.log('没有返回值的函数，返回值类型就是void')
}

// never类型
function neverFun(): never {
  throw new Error('扔出一个报错，永远不会结束')
  console.log('下边的内容永远不会执行了')
}


// 字面量类型的几种写法
let zmlVal01: 1 = 1 // 数字字面量，变量只能是数字1，改成2就会报错，好像是声明了一个常量
let zmlVal02: '小石头' | 'xing.org1' = '小石头'

// 对象的这种写法，不常用。后期会有独特的约束方式
let zmlVal03: {
  name: string // 这里好像不用逗号也可以
  age: number
} = {
  name: '小石头',
  age: 19
}

let arr: [] = [] // 空数组定义，将不能在数组里增加内容
// arr = [1] // 改变数组长度将会报错。

// 元祖类型写法
let tupleVal: [string, number, boolean] = ['第一项必须是字符串', 123, false]
// 数组长度必须是三项，每一项的类型必须与type约束的一一对应

// any
let anyVal: any

// 可以将any类型的变量赋值给任何值
let numByAny: number = anyVal
let strByAny: string = anyVal
let boolByAny: boolean = anyVal
// 这么写有安全隐患，尽量别这么用，这么用和没用ts一个样。


/* 类型别名 */
// 定义
type sexType = '男' | '女'
type User = {
  name: string
  age: number
  sex: sexType
}

// 使用
let userObj: User = {
  name: '小石头',
  age: 19,
  sex: '女'
}

function dealUserObj(params: User[]) {
  params.forEach((el: User) => {
    console.log(el)
  })
}

/* 类型推导 */
/**
 * a和b都是number，返回值也是number类型
 * @param a number
 * @param b number
 */
function combin(a: number, b: number): number;
/**
 * a和b都是string，返回值也是string类型
 * @param a string
 * @param b string
 */
function combin(a: string, b: string): string;
function combin(a: number | string, b: number | string): number | string {
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b
  }
  if (typeof a === 'number' && typeof b === 'number') {
    return a * b
  }
}
combin(1, 2)
// 函数调用的时候，就会提醒用户该传什么类型的参数
// combin()

/* 可选参数 */
function kexuan(a: number, b: number, c?: number): number {
  if (c) {
    return a + b + c // 这也是一种类型保护，也算是容错机制？
  }
  else {
    return a + b
  }
}
kexuan(1, 2)
kexuan(1, 2, 3)

/* 默认参数 */
function moren(a: number, b: number, c: number = 0): number {
  return a + b + c
}
/**
 * 编译后效果
 * 
  function moren(a, b, c) {
    if (c === void 0) { c = 0; }
    return a + b + c;
  }
 */
moren(1, 2)
moren(1, 2, 3)

/* 剩余参数 */
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
/**
 * 
 * 编译后效果
 * 
 function buildName(firstName) {
   var restOfName = [];
   for (var _i = 1; _i < arguments.length; _i++) {
       restOfName[_i - 1] = arguments[_i];
   }
   return firstName + " " + restOfName.join(" ");
 }
 var employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
 */

 
/**
 * 类似下边这种写法
 */
let [head, ...tail] = [1, 2, 3, 4];
//  head // 1
//  tail // [2, 3, 4]


/**
 * 枚举
 * 
  enum 枚举名称 {
    枚举字段1 = 值1,
    枚举字段x = 值x
	}
 */
enum enumSexType {
  male = 'man',
  female = 'woman'
}
enum directionType {
  // 以四个方向键的keycode码来举例，枚举的字段值可以是数字
  left = 37,
  up = 38,
  right = 39,
  down = 40
}
//使用枚举后，不能用真实的值来赋值，而是用对象.属性的写法
let user1Sex = enumSexType.female 
let user2Sex = enumSexType.male
console.log(user1Sex, user2Sex)
let enum1 = directionType.left
console.log(enum1)
/**
 * 编译结果
    var enumSexType;
    (function (enumSexType) {
        enumSexType["male"] = "man";
        enumSexType["female"] = "woman";
    })(enumSexType || (enumSexType = {}));
    var directionType;
    (function (directionType) {
        // 以四个方向键的keycode码来举例，枚举的字段值可以是数字
        directionType[directionType["left"] = 37] = "left";
        directionType[directionType["up"] = 38] = "up";
        directionType[directionType["right"] = 39] = "right";
        directionType[directionType["down"] = 40] = "down";
    })(directionType || (directionType = {}));
    //使用枚举后，不能用真实的值来赋值，而是用对象.属性的写法
    var user1Sex = enumSexType.female;
    var user2Sex = enumSexType.male;
    console.log(user1Sex, user2Sex);
 */