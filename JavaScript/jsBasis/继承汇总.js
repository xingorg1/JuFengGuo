// 原型链继承
function SuperType() {
  this.property = true;
}
SuperType.prototype.getSuperValue = function () {
  return this.property;
};

function SubType() {
  this.subproperty = false;
}
//继承了 SuperType 
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function () {
  return this.subproperty;
};
var instance = new SubType();
alert(instance.getSuperValue()); //true
// 最主要的问题来自包含引用类型值的原型。 我们前面介绍过包含引用类型值的原型属性会被所有实例共享； 而这也正是为什么要在构造函数中， 而不是在原型对象中定义属性的原因。 在通过原型来实现继承时， 原型实际上会变成另一个类型的实例。 于是， 原先的实例属性也就顺理成章地变成了现在的原型属性了。

function SuperType() {
  this.colors = ["red", "blue", "green"];
}

function SubType() {
  //继承了 SuperType 
  SuperType.call(this);
}
var instance1 = new SubType();
instance1.colors.push("black");
alert(instance1.colors); //"red,blue,green,black" 
var instance2 = new SubType();
alert(instance2.colors); //"red,blue,green"


