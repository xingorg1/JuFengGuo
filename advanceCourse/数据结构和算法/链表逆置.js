
/* 链表的逆置 */
function Node3(value){
  this.value = value
  this.next = null
}
var A3 = new Node3('A1')
var B3 = new Node3('B2')
var C3 = new Node3('C3')
var D3 = new Node3('D4')
var E3 = new Node3('E5')

A3.next = B3
B3.next = C3
C3.next = D3
D3.next = E3

// 获取最后一个结点
function lastNode(firstNode){
  if(firstNode.next === null) return firstNode
  console.log(firstNode.value)
  return lastNode(firstNode.next) // 因为递归调到很深处了，如果这个递归函数最终需要返回值，那么在第一层函数递归那里就应该有返回值（类似这里）
}
console.log(lastNode(A3))

// 逆置链表
function reverseLink(rootNode){
  if(rootNode.next.next === null){ // 代表当前结点是最后一个末尾结点
    rootNode.next.next = rootNode; // 让最后一个结点指向自己（即指向倒数第二个结点）
    return rootNode.next; // 返回最后一个结点
  }else {
    var result = reverseLink(rootNode.next)
    rootNode.next.next = rootNode;
    rootNode.next = null;
    return result;
  }
}
var newRoot = reverseLink(A3)
console.log(newRoot)

// 遍历检查逆置的结果
function enumerateLink(node){
  console.log(node.value)
  if(node.next === null) return false
  enumerateLink(node.next)
}
enumerateLink(newRoot)