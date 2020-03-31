// 线性数据结构-链表

var b = {
  value: 'b',
  next: null // 指针为空，就是链表的末端
}

var a = {
  value: 'a',
  next: b // 引用指向b
}

// console.log(a.next === b) // true

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

/* 遍历链表
function Node(value){
  this.value = value;
  this.next = null
}
var A = new Node('a')
var B = new Node('b')
var C = new Node('c')
var D = new Node('d')

A.next = B
B.next = C
C.next = D
 */
/* 
function ergodic(linkNode){ // 入参为链表上的一个节点
  while(linkNode.next){
    // console.log(linkNode.value) // 依次打印a、b、c，没有打印d
    linkNode = linkNode.next
  }
  // console.log(linkNode.value)
}
ergodic(A) */

function ergodic(linkNode){ // 入参为链表上的一个结点
  while(true){ // 【重要思想】因为链表没有长度属性，所以用无限循环来实现遍历
    console.log(linkNode.value)
    if (linkNode.next) { // 如果next有值，说明不是末尾结点，可以继续向下遍历
      linkNode = linkNode.next // 替换linkNode为下一个即可。
    } else {
      break // 【写无限循环的第一步】先找一个出口。不能写成无限死循环。
    }
  }
}

ergodic(A) // 传递链表的根结点

/* 递归遍历 */
function Node2(value){
  this.value = value
  this.next = null
}

var A2 = new Node2('A2')
var B2 = new Node2('B2')
var C2 = new Node2('C2')
var D2 = new Node2('D2')

A2.next = B2
B2.next = C2
C2.next = D2

function diguiErgodic(node){
  /* 
  第一种写法
  console.log(node.value)
  if(node.next === null){
    return false
  } else {
    diguiErgodic(node.next)
  } */
  // 第二种写法
  console.log(node.value)
  if(node.next === null) return false // 递归和while true一定要先写出口
  // else diguiErgodic(node.next)
  diguiErgodic(node.next)
}
diguiErgodic(A2)
