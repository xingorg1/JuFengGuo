



var a = 'window';
function Obj(){
  // var a = 1;
  this.b = 2;
  this.sayA = function(){
    console.log(this.a)
    console.log(this.b)
    console.log(a)
  }
}
var obj = new Obj();
console.log(111,obj)
var b = new Obj().b;
var f = new Obj().sayA;
console.log(222,b,f)
debugger;
new Obj().c = 'cc';
console.log(333,new Obj().c,'因为上一个new Obj()和这一行的new Obj()不是同一个堆内存，不是同一个地址')




// 圣杯继承：
function inherit(target,origin){
  function F(){};
  F.prototype  = origin.prototype;
  target.prototype = new F();
  target.prototype.constuctor = target;
  target.prototype.uber = origin.prototype;
}
function Father(){

}
Father.prototype.lastName = 'guo';
function Son(){}
inherit(Son,Father);
var son = new Son();

var ao = {},
    af = function(){

    };

var foo = {},
F = function () {
  console.log('we')
};
Object.prototype.a = 'obj a';
Function.prototype.b = 'fun b';
console.log(foo.a) //obj a
console.log(foo.b) // undefined
console.log(F.a) // obj.a
console.log(F.b) // fun b

Grand.prototype.lastName = '郭';
function Grand(){
  this.site = "河北"
} 
var grand = new Grand();

Father.prototype = grand;
function Father(){ 
  this.money = 999999999;
  this.fortune = {
    car1: '招商银行卡',
    car2: '建设银行卡'
  }
}
var father = new Father;

Son.prototype = father;
function Son(){
  this.name = '菊锋';
}
var son = new Son();


下面代码中console出结果是[1,2,3,4,5]的：
1、
function foo(x){
  console.log(arguments);
  return x;
}
foo(1,2,3,4,5)
2、
function foo(x){
  console.log(arguments);
  return x;
}(1,2,3,4,5)
3、
(function foo(x){
  console.log(arguments); 
  return x;
})(1,2,3,4,5)
4、
function foo(){
  bar.apply(null,arguments);
}
function bar(x){
  console.log(arguments);
}
foo(1,2,3,4,5)

baidu 2013
var x = 1,
  y = z = 0;

function add(n) {
  return n = n + 1;
}
y = add(x);

function add(n) {
  return n = n + 3;
}
z = add(x);
console.log(x, y, z);
1,4,4

function Person(name) {
  var a = 0;
  this.name = name;

  function add() {
    a++;
    console.log(a);
  }
  this.say = add;
}
// 这究竟是闭包的AO继承还是形成新的作用域？按照我工作中调用多个函数的经历来说像是多个新作用域，但是看姬成的课又觉得是AO的直接引用拷贝。
var person1 = new Person('gjf');
person1.say();
person1.say();
var person2 = new Person('gjf181');
person2.say();

function Person(name) {
  var a = 0;
  this.name = name;

  function add() {
    a++;
    console.log(a);
  }
  // this.say = add;
  return add;
}

var person1 = Person('gjf');
person1();
person1();
var person2 = Person('gjf181');
person2();


题：
var a = 5;

function test() {
  a = 0;
  console.log(a);
  console.log(this.a)
  var a;
  console.log(a)
}
test();
0, 5, 0
new test();
0, undefined, 0

var str = 'abc';
str += 1;
var test = typeof (str);
if (test.length == 6) {
  test.sign = 'typeof的返回结果是String';
}
console.log(test.sign);

function employee(name, code) {
  this.name = 'wangli';
  this.code = 'A001';
}
var newEmp = new employee('zhangming', 'A002');
console.log(newEmp.name)
console.log(newEmp.code)

var str = 'abcd';
str.length = 2;
console.log(str)
var newStr = new String('abcd')
console.log(newStr)
console.log(newStr.length);
newStr.length = 2;
console.log(newStr)
console.log(newStr.length);



/* 包装类过程 以下隐式的环节就叫包装类*/
var num = 4;
num.len = '新属性';
// 隐式过程1：new Number(4).len = 3;
// 新建一个数字对象，并给数字对象加上len属性。（弥补你操作的不足）。
// 隐式过程2：delete new Number(4);
// 把刚才新建的变量再删掉了。
console.log(num.len);
// 再次访问该属性：
// 隐式过程1：再次new Number(4),创建一个新的数字4的对象。
// 隐式过程2：并访问其属性len
// 因为第二次new的对象和第一次的对象是完全不一致的两个对象，况且第一个对象都已经销毁了，没有指向他的指针了。
// 所以，第二个对象上找不到len属性，最后结果得到undefined
var arr = [1, 2];
arr.length = 8;
console.log(arr);
arr.length = 1;
console.log(arr);


function Student(name, age, sex) {
  this.name = name;
  this.age = age;
  this.sex = sex;
  this.grade = 2014;
  return []; //null、undefined、123、'gjf'、false,我都试过了，结果皆如此
}
var student = new Student('gjf', 18, '女');
console.log(student)

function Student(name, age, sex) {
  /* 第一步隐式变化： 在内部逻辑的最顶端，创建一个this 空对象。（理论上的空对象）
    var this = {};
    因此该Student函数内部的AO对象中，就有了这个this对象（原来this默认指向window，现在被修改了）
    AO {
      this: {}
    }
   */
  this.name = name;
  this.age = age;
  this.sex = sex;
  /* 第二步隐式变化：函数内部有定义类似"this.属性名"这种形式的变量，都被添加到刚创建的this对象上。
    此时，AO里this就成了这样：
    AO {
      this: {
        name : 'gjf',
        age : 18,
        sex : '女',
        grade : 2014
      }
    }
  */
  this.grade = 2014;
  /* 第三步隐式变化：最后，隐式返回this对象
    return this;
  */
}
var student = new Student('gjf', 18, '女');
/* 
  外部，student接收到的就是这个this对象，那么student表示出来就成了：
  student = {
    name : 'gjf',
    age : 18,
    sex : '女',
    grade : 2014
  }
*/
function Person(name, height) {
  var that = {};
  that.name = name;
  that.height = height;
  // return that;
  return {};
}
var person = Person('gjf', 180);

var a = new Number(123);
a.shuxing = 'a数字对象自己的属性';

console.log(a)

// false
// false
// false
// false
// ['c','d']
function testArg(first, second, three) {
  'use strict'
  // 严格模式没有映射、多余位没有映射
  console.log(first === arguments[0]);
  console.log(second === arguments[1]);
  first = {};
  first.name = 'ttt';
  first.name2 = 'ttt2';
  second = 'd';
  second.name = 'test';
  console.log('second.name', second.name)
  console.log(first === arguments[0]);
  console.log(second === arguments[1]);
  console.log('arguments[1].name', arguments[1].name);
  console.log('arguments[1].suibianyigemingzi', arguments[1].suibianyigemingzi);

  console.log(three, arguments);
  three = 'e';
  console.log(three, arguments);
}
testArg({
  name: 'w'
}, 'b');

undefined 和 null 不可以有属性
// 数组乱序
var arr = [1, 2, 3, 4, 5, 6];
arr.sort((a, b) => {
  let ran = Math.random();
  return ran - 0.5;
});

Boolean(function b() {});
if (function b() {}) {
  var x = 1;
  x += typeof b;
}
console.log(x);

var f = (function a() {
  return "1";
}, function g() {
  return 2;
})();
console.log(typeof f)

var i = 1;
var a = (function b() {
  ++i;
  console.log('test1', i)
  return '1';
}, function c() {
  var c = i++;
  console.log('test2', i)
  return c;
})();
console.log('a', a);
console.log('i', i);
var i = 5;
var b = (++i, i++, i++)
console.log(b);
console.log(i);

var i = 5;
var b = ((console.log(i, ++i, i)), (console.log(i, i++, i)), (console.log(i, i++, i)));

var i = 1;
var a = (function b() {
  return (i++);
}, function c() {
  return (i++);
})();
console.log(a);
console.log(i);

var testStr = "郭菊 12ert锋";
var strLength = 0;
for (let i = 0; i < testStr.length; i++) {
  console.log(testStr.charAt(i), "长度为：" + testStr.charCodeAt(i));
  if (testStr.charCodeAt(i) >= 255) {
    strLength += 2;
  } else {
    strLength += 1;
  }
}
console.log("总字节长度为：", strLength)
// 函数封装
// 1. 计算字节长度
function getStrBytes(str) {
  str = str.toString();
  var strLen = 0;
  for (let s = 0; s < str.length; s++) {
    if (str.charCodeAt(s) >= 255) {
      // 中文，字节为2.
      strLen += 2;
    } else {
      // 非中文,字节为1.
      strLen += 1;
    }
  }
  return strLen;
}

function getStrBytes2(str) {
  str = str.toString();
  var strLen,
    count;
  strLen = count = str.length;
  for (let s = 0; s < strLen; s++) {
    if (str.charCodeAt(s) >= 255)
      count++;
  }
  return count;
}
console.log("字节长度为：" + getStrBytes2("gjf四郭菊锋"))
// 2. 计数器
function getStrNum(str) {
  return Math.ceil(getStrBytes(str) / 2);
}
getStrNum("郭菊锋继续努力加油!!耶!");
var a = 5;

function test() {
  a = 0;
  console.log(a)
  console.log(this.a)
  var a;
  console.log(a)
}
new test()

一个累加器：
var count = 0; //全局变量
function add() {
  count++;
  console.log(count)
}
add();
add();
add();
add();
add();
add();
add();

利用闭包的优化写法：
function add() {
  var count = 0;

  function bar() {
    count++;
    console.log(count);
  }
  return bar;
}
var counter = add();
counter();

function a(a, b, c, d) {
  console.log(a + b + c + d)
}(1, 2, 3, 4)

function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = function () {
      console.log(i)
    }
  }
  return arr;
}
var a = test();

function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    (function (i) {
      // i
      arr[i] = function () {
        console.log(i)
      }
    })(i)
  }
  return arr;
}
var a = test();


// 不用立即执行函数，改用函数也可以
function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    demo(i);
    // (function (i) {})(i)
  }

  function demo(i) {
    console.log(i)
    arr[i] = function () {
      console.log(i)
    }
  }
  return arr;
}
var a = test();

function test() {
  var arr = [];
  for (var i = 0; i < 10; i++) {
    arr[i] = (function (i) {
      console.log(i);
      return i;
    })(i)
  }
  return arr;
}
var a = test();
GO {
  this: window,
  arguments: [],
  a: test的返回值,
  test: function () {}
}
AO {
  this: window,
  arguments: [],
  arr: [],
  i: Number类型， test执行后for循环完就是10
}
a[1]() AO {
  this: window,
  arguments: [],
}

function Foo() {
  getName = function () {
    alert(1);
  };
  return this;
}
Foo.getName = function () { //静态属性
  alert(2)
}
Foo.prototype.getName = function () {
  alert(3);
}
var getName = function () {
  alert(4)
}

function getName() {
  alert(5);
}

Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();


GO {
  Foo: funciton() {}
  // getName: undefined
  // getName: function(){} 5
  // getName: 4
  getName: 1
}
FooAO {
  this: window,
  arguments: []
}
Foo.getName() => 2
getName() => 4
FOO(), this指window window.getName => 1
getName() 同上 => 1(优先执行) Foo.getName() => 2， 然后new 构造出来的没有this， 所以？
Foo().getName() window.getName(), 优先调用 => 1
Foo().getName() window.getName() ?

  console.log(a)

function a() {
  return 2;
}
var a = 1;


var value = 2;

var foo = {
  value: 1
};

function bar(name, age) {
  return {
    value: this.value,
    name: name,
    age: age
  }
};


var nickname = "Kitty";

function Person(name) {
  this.nickname = name;
  this.distractedGreeting = function () {
    console.log(1, this.nickname)
    setTimeout(function () {
      console.log(2, this.nickname);
    }.bind(this), 500);
  }
}
var person = new Person('jawil');
person.distractedGreeting();

3、 柯里化（ curry）
只传递给函数一部分参数来调用它， 让它返回一个函数去处理剩下的参数。

可以一次性地调用柯里化函数， 也可以每次只传一个参数分多次调用。

var add = function (x) {
  return function (y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12

add(1)(2);
// 3
这里定义了一个 add 函数， 它接受一个参数并返回一个新的函数。 调用 add 之后， 返回的函数就通过闭包的方式记住了 add 的第一个参数。 所以说 bind 本身也是闭包的一种使用场景。
Function.prototype.bind2 = function (context) {
  var self = this; // this 指向调用者
  console.log(11, self)
  return function () { // 实现第 2点
    console.log(2, self)
    console.log(3, this)
    return self.apply(context); // 实现第 1 点
  }
}
var value = 2;
var foo = {
  value: 1
};

function bar() {
  console.log(1, this)
  return this.value;
}
var bindFoo = bar.bind2(foo);
bindFoo(); // 1

var obj = {
  say: function () {
    function _say() {
      console.log(this);
    }
    console.log(obj);
    return _say.bind(obj);
  }()
}
obj.say()

console.log(obj);
console.log(this);


// 形成闭包的时候， 外部函数的所有属性和方法都不能释放吗？ 还是只有内部函数引用的那几个不能释放呢？
var obj = {
  test1: function () {
    var a = 1;
    var b = '2';
    var c = function () {
      console.log('呼哈哈');
    }

    function test2(d) {
      // a++;
      // console.log(b+d)
      // console.log(c)
      console.log(a++);
    }
    return test2;
  }
}

var bibao = obj.test1();
bibao(1);
console.log(bibao(1111))
bibao
var a = (function b() {
  return 'b';
}, function c() {
  return 'c';
})();