
class Person{
  static myName(){
    return 'my name is Father'
  }
  constructor(name){
    this.name = name;
    this.myName = function(){
      return this.name;
    }
  }
  lastName(){
    return "guo"
  }
  eat(){
    return 'i can eat'
  }
}
/* 自己在class外边写的prototype原型属性和方法，不会被加到_createClass中进行处理 */
Object.defineProperty(Person.prototype, 'mySelfSet',{
  value: '自定义属性',
});
const person =  new Person('jf');

/* Man 继承 Person */
class Man extends Person{
  static drink(){
    return 'i love drinking milk';
  }
  constructor(myShuXing){
    super();
    this.siyouShuXing = myShuXing;
  }
  eat(){
    return 'i can eat banana';
  }
}

class WoMan extends null{
  
}


/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-16 10:26:12 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-16 16:39:59
 * class练习
 */
// npx babel originFile/class.js -o babelFile/class.js --watch