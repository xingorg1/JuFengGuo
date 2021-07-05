
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
  if (rootNode.next.next === null) { 
    // 代表当前结点是倒数第二个结点。他的下一个结点符合倒数第一个结点的规则，即其next是null，
    rootNode.next.next = rootNode; // 让最后一个结点指向倒数第二个结点
    return rootNode.next; // 返回最后一个结点
  } else {
    var result = reverseLink(rootNode.next) // 这里很关键，在替换next之前就递归了。而只有递归出来后，接下来才会替换next。这种写法也就是实现：先递归到最末尾、从后向前再开始修改每一结的next的效果。 // 如果不是最后一节，就向下深入 下钻一层。等一层层钻完回来了，就有返回值，用result接收
    // 倒数第三个
    rootNode.next.next = rootNode; // 将倒数第四个的next置为倒数第三个，因为递归，以此类推，3的为2，2的为1。第四个等于第三个，因为递归，第三个等于第二个...
    rootNode.next = null; // 一定记得将当前的置为null，因为递归，以此为4的为null、3为null、2为null、1为null。重点！！！千万记得给上一个的next置为null，不然就是死循环
    return result; // 将结果返回，非倒数第二个的递归，返回值是之前递归返回的，相当于又把第五个一层层返回了出来。
  }
}
var newRoot = reverseLink(A3) // 传入根结点
console.log(newRoot)

// 遍历检查逆置的结果
function enumerateLink(node){
  console.log(node.value)
  if(node.next === null) return false
  enumerateLink(node.next)
}
enumerateLink(newRoot)

console.log('xin')
function Node4(value) {
  this.value = value
  this.next = null
}
let A4 = new Node4('A4-1')
let B4 = new Node4('B4-2')
let C4 = new Node4('C4-3')
let D4 = new Node4('D4-4')
let E4 = new Node4('E4-5')
A4.next = B4
B4.next = C4
C4.next = D4
D4.next = E4
function nizhi(node){
  if (node.next.next == null) {
    // 找到倒数第二个
    node.next.next = node // 倒数第一节指向倒数第二节
    return node.next // 返回最后一节
  } else {
    let result = nizhi(node.next) // 如果不是最后一节，就向下深入 下钻一层。等一层层钻完回来了，就有返回值，用result接收
    // 倒数第三个
    node.next.next = node // 第四个等于第三个，因为递归，第三个等于第二个...
    node.next = null // 重点！！！千万记得给上一个的next置为null，不然就是死循环
    return result // 非倒数第二个的递归，返回值是之前递归返回的，相当于又把第五个一层层返回了出来。
  }
}
var nizhiResult = nizhi(A4)
console.log(nizhiResult)
function diguiNizhi(node){
  console.log(node)
  node.next && diguiNizhi(node.next)
}
diguiNizhi(nizhiResult)

// 逆置原理
/* 
function reverseLink(rootNode){
	if (rootNode.next.next === null) {
		rootNode.next.next = rootNode;
		return rootNode.next;
	} else {
		var result = reverseLink(rootNode.next)
		rootNode.next.next = rootNode;
		rootNode.next = null;
		return result;
	}
}
var newRoot = reverseLink(A1)
console.log(newRoot)
链表：{
  value: 'A1'
  next: {
    value: 'B2',
    next: {
      value: 'C3',
      next: {
        value: 'D4',
        next: {
          value: 'E5',
          next: null
        }
      }
    }
  }
}


调用reverseLink函数，传入根结点A1。reverseLink(A1)
	if判断A1.next.next === null? 不成立（B2.next = C3）
	进入else
		调用reverseLink函数，递归传入A1.next，即reverseLink(B2)
			if判断B2.next.next === null? 不成立（C3.next = D4）
			进入else
				调用reverseLink函数，递归传入B2.next，即reverseLink(C3)
					if判断C3.next.next === null? 不成立（D4.next = E5）
					进入else
						调用reverseLink函数，递归传入C3.next，即reverseLink(D4)
							if判断D4.next.next === null? 成立（D4.next.next == E5.next = null）
								将当前结点D4.next.next，即E5.next重新赋值，E5.next = D4
						    return E5，返回根结点、递归出口
            递归调用出来，返回值E5给了result
            将当前结点C3.next.next，即D4.next重新赋值，D4.next = C3
            C3.next = null
            return result，即返回E5
        递归调用出来，返回值E5给了result
        将当前结点B2.next.next，即C3.next重新赋值，C3.next = B2
        B2.next = null
        return result，即返回E5
    递归调用出来，返回值E5给了result
    将当前结点A1.next.next，即B2.next重新赋值，B2.next = A1
    A1.next = null
    return result，即返回E5，根结点
调用函数完毕，返回值赋值给newRoot
 */