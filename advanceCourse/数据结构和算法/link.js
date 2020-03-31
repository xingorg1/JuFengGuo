// 线性数据结构-链表
/* 生成链表 */

var b = {
  value: 'b',
  next: null // 指针为空，就是链表的末端
}

var a = {
  value: 'a',
  next: b // 引用指向b
}

// console.log(a.next === b) // true

/* 工厂模式创建链表 */
function Node(value){
  this.value = value;
  this.next = null;
}

var A = new Node('a')
var B = new Node('b')
var C = new Node('c')
var D = new Node('d')
A.next = B
B.next = C
C.next = D
console.log(A) // A - 根节点
// 下线查找
console.log(A.next) // B
console.log(A.next.next) // C
console.log(A.next.next.next) // D
