// 一些基础类型
// TODO: 如果注掉各变量的引用，本文件代码不会打包进去，tree shaking

// 声明数组中元素数据类型
let arr1: number[] = [1, 2, 3]
let arr2: string[] = ['1', '2', '3']
let arr3: (number | string)[] = [1, '2', 3]
let arr4: Array<number | string> = [1, '2', 3] // 泛型方式来声明
// console.log(arr1, arr2, arr3)

// any
let any: any = 12
console.log(any)

// 非空断言操作符
type O = {
  c: number
}
let root: O | null = null
if (root) {
  root!.c = 123 // 用非空断言表示，root肯定不为null，适用于后端返回的数据在确定类型的时候引用
}

// 子类型 null、undefined，可以给任何其它类型
// let num: undefined | null | number = 12
// let str: string = undefined // TypeScript Error：不能将类型“undefined”分配给类型“string”
// let numUndefined: undefined = 23 // TypeScript Error：不能将类型“23”分配给类型“undefined”
// let x: number;
// x = 1;
// x = undefined;
// x = null;

// let y: number | null | undefined;
// y = 1;
// y = undefined;
// y = null;

// void 没有任何类型
// 当一个函数没有返回值时，TS 会认为它的返回值是 void 类型。
function greeting(name: string): void {
  console.log('hello', name)
  //当我们声明一个变量类型是 void 的时候，它的非严格模式(strictNullChecks:false)下仅可以被赋值为 null 和 undefined
  //严格模式(strictNullChecks:true)下只能返回undefined
  // return null; // TypeScript Error：不能将类型“null”分配给类型“void”  FIXME: 为啥strictNullChecks设置为false，也不能返回null呢？
  return undefined // 可以把undefined分配给void
}

// never 永远不会返回值（拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。）

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function error(message: string): never {
  // 这个never需要显示声明
  throw new Error(message)
}
// let result1 = error('hello')
// result1 = undefined // never与void对不同点，不能将undefined再分配，因为 never 是一个不包含值的类型

// 由类型推论得到fail函数的返回值也为 never
function fail() {
  return error('Something failed')
}

// 返回never的函数 必须存在 无法达到（ unreachable ） 的终点
function infiniteLoop(): never {
  while (true) {}
}

/* never 和 void 的区别
void 可以被赋值为 null 和 undefined的类型。 never 则是一个不包含值的类型。
拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。
 */

// Symbol（需要es6 的编译辅助库）
const sym1 = Symbol('key')
const sym2 = Symbol('key')
console.log(Symbol('key') === Symbol('key')) // false

// BigInt（target需要为EsNext编译辅助库，否则报错：目标低于 ES2020 时，bigInt 文本不可用。）
const max = Number.MAX_SAFE_INTEGER // 2**53-1
console.log(max + 1 === max + 2)
const max1 = BigInt(Number.MAX_SAFE_INTEGER)
console.log(max1 + 1n === max1 + 2n)

// 包装对象 （Wrapper Object）
let ObjectWrapper1: boolean = Boolean(1) // 编译失败   期望的 isOK 是一个原始数据类型
// let ObjectWrapper2: boolean = new Boolean(1); // 编译失败   期望的 isOK 是一个原始数据类型
// TypeScript Error：不能将类型“Boolean”分配给类型“boolean”。
// “boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。ts(2322)

// 联合类型 （Union Types）
let name: string | number;
// console.log(name.toString());
name = 3;
console.log(name.toFixed(2));
name = 'zhufeng';
console.log(name.length);

export {};

// 类型断言 as
let name1: string | number;
// console.log((name1 as string).length);
// 将变量类型断言为多个联合类型的其中一个类型
// 双重断言：两个as
'双重断言' as any as string; // ok

// 字面量类型(一个变量的值就是展示的类型，不能是其他)
let left: "Left" = "Left";
type Direction = 'Up' | 'Down' | 'Left' | 'Right'; // 字符串字面量
// left = 'sdf' // 不能将类型“"sdf"”分配给类型“"Left"”

/* 字符串字面量 vs 联合类型
字符串字面量约束取值，联合类型约束类型：
  字符串字面量类型用来约束取值只能是某几个字符串中的一个, 联合类型（Union Types）表示取值可以为多种类型中的一种
字符串字面量限定固定值，联合类型限制类型
  字符串字面量 限定了使用该字面量的地方仅接受特定的值,联合类型 对于值并没有限定，仅仅限定值的类型需要保持一致 */