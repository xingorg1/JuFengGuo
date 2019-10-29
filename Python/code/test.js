if (1 < 2) {
  console.log('if')
} else if (3 > 4) {
  console.log('else if')
} else {
  console.log('else')
}
for (var i in [1, 2, 3]) {
  console.log(i)
}
for (var i = 0; i < 2; i++) {
  console.log(i)
} // 0、1、

console.log('打印店')
var a = 0
while (a < 2) {
  console.log('不是无限死循环')
  a++
}

function hanshu(a, b) {
  var c = a * b
  return c
}
var result = hanshu(1, 2)
console.log(result)

// es6面向对象
class Person {
  constructor() {
    this.type = '人类'
  }
  eating() {
    console.log(this.type + this.name + '生下来就会吃饭')
  }
}

class Gjf extends Person {
  constructor(name,age=18) {
    super()
    this.name = name
    this.age = age
  }

  greeting(yourName) {
    console.log(`${this.age}岁的${this.name}向${yourName}说hello！`)
  }

}

var gjf = new Gjf('guojufeng')
gjf.eating()
gjf.greeting('小石头')

// es5的面向对象与继承
function Person() {
  this.type = '人类'
}
Person.prototype.eating = function () {
  console.log(this.type + this.name + '生下来就会吃饭')
}

function Gjf(name,age=18) {
  this.name = name
  this.age = age
}
Gjf.prototype.greeting = function (yourName) {
  console.log(`${this.age}岁的${this.name}向${yourName}说hello！`)
}
Gjf.prototype.__proto__ = new Person()

var gjf = new Gjf('guojufeng')
gjf.eating()
gjf.greeting('xing.org1^')