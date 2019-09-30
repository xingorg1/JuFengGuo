// 工厂模式
function createPerson(name,age,job) {
  var o = new Object();
  o.name = name;
  o.sayName = function(){
    console.log(this.name)
  }
  return o;
}
var person = createPerson('gjf',12,'hahha');

// 构造函数模式
function Person(name){
  this.name = name;
  this.sayName = function(){
    console.log(this.name)
  }
};
var person = new Person('gjf');

// 原型模式
function Person(){

}
Person.prototype.name = 'gjf';
Person.prototype.sayName = function(){
  console.log(this.name);
}
var person = new Person();

// 组合使用构造函数模式和原型模式
function Person(name,age){
  this.name = name;
  this.age = age;
}
Person.prototype = {
  constructor: Person,
  sayName : function(){
    console.log(this.name);
  }
}
var person = new Person('gjf',18);
var person1 = new Person('gjf1',188);

// 动态原型模式
// 它把所有信息都封装在了构造函数中，而通过在构造函数
// 中初始化原型（仅在必要的情况下），又保持了同时使用构造函数和原型的优点。
function Person(name){
  this.name =name;
  if(typeof this.sayName != 'function'){
    Person.prototype.sayName = function(){
      console.log(this.name)
    }
  }
}
var person = new Person('gjf', 18);
person.sayName()

// 寄生构造函数模式
function Person(name){
  var o = new Object();
  o.name = name;
  o.sayName = function(){
    console.log(this.name)
  }
  return o;
}
var person = new Person('gjf', 18);
person.sayName();

// 稳妥构造函数模式
function Person(name){
  var o = new Object();
  // 创建要返回的对象
  o.name = name;
  // 方法
  o.sayName = function(){
    console.log(name)
  }
  return o;
}
var person = new Person('gjf', 18);
person.sayName();