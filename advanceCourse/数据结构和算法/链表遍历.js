
/* 遍历链表 */
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
