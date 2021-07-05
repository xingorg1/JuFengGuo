
function * generator(){
  yield 'one-1';
  yield 'two-2';
  yield 'three-3';
  return '最后'
}
let gene3 = generator();
console.log(gene3.next)
console.log(gene3.next());
 
// 给obj加迭代函数
let iteObj = {
  0: '1a',
  1: '2b',
  2: '3c',
  3: '4d',
  length: 4,
  [Symbol.iterator]() {
    let curIndex = 0;
    let next = () => {
      return {
        value: this[curIndex++],
        done: curIndex > this.length // 为true停止调用，为false就会一直进行下一个next调用
        /* // 老师的写法，改进，将前置自增改为后置自增，否则会少迭代最后一个
        value: this[curIndex],
        done: this.length == curIndex++ */
      }
    }
    return {
      next
    }
  }
}



/*
 * @Author: @Guojufeng 
 * @Date: 2019-05-27 16:08:28 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2019-05-27 16:15:59
 * generator编译后的效果
 */