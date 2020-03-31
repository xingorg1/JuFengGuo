
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

function diguiErgodic1(node){
  console.log(node.value)
  if(node.next === null){
    return false
  } else {
    diguiErgodic1(node.next)
  }
}

function diguiErgodic(node){
  // 第二种写法
  console.log(node.value)
  if(node.next === null) return false // 递归和while true一定要先写出口
  diguiErgodic(node.next)
}
console.log(diguiErgodic(A2), '查看递归调用结果') // 即使最后跳出递归时return了false,这个函数返回值是也undefined。那是因为递归是函数运行套函数运行的。在diguiErgodic(node.next)之前没有返回值，进入递归循环后，只要if条件没有成立，则函数环境内都没有返回值的。if条件成立也是函数嵌套的最深一层了，就像套娃的最里边那个，他有return，但是到了倒数第二个套娃开始就没用返回值了，所以递归出来后也就没有返回值了。

/* 就像下边这种效果了。
diguiErgodic(
  diguiErgodic(
    diguiErgodic(
      diguiErgodic(
        if(true) return 'a'
      )
    ) 
  )
)
*/
