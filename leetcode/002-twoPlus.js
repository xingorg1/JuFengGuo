/**
 * 两数相加
 * 
给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的每个节点只能存储 一位 数字。

如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。

您可以假设除了数字 0 之外，这两个数都不会以 0 开头。

输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
输出：7 -> 0 -> 8
原因：342 + 465 = 807

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/add-two-numbers
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers1 = function (l1, l2) {
  let s1 = '',
    s2 = '',
    result = 0
  while (l1 || l2) {
    if (l1) {
      s1 += l1.value
      l1 = l1.next
    }
    if (l2) {
      s2 += l2.value
      l2 = l2.next
    }
  }
  result = Number(s1) + Number(s2) + '' // 807
  console.log(result)
  // console.log(result)
  // function ListNode(val){
  //   this.val = val,
  //   this.next = null
  // }
  // 问题，不知道怎么创建一个新节点
};

// 新思路，每一个节点都是一个链表的跟节点，我直接改l2作为传出去的节点即可。
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers2 = function (l1, l2) {
  let result = l2
  while (l1 || l2) {
    l2.value += l1 ? l1.value : 0
    if (l2.value > 9) {
      l2.value = 0 // 相加大于10的测试用例不过，只能用于等于10的
      // l2.value = l2.value % 10
      if (l2.next) {
        l2.next.value++
      } else {
        l2.next = {
          value: 1,
          next: null
        }
      }
    }
    console.log(l2)
    l2 = l2.next
    l1 && (l1 = l1.next)
  }
  console.log(result)
  return result
};
// 运行出错，打出result是l2，和我node环境测试的不一样，vscode的terminal可以，leetcode不行。

// 后来找到原因，链表里不是value，是val啊啊啊啊


// 试试下边这个方案
var addTwoNumbers4 = function (l1, l2) {
  let result = l2
  while (l1 || l2) {
    l2.val += l1 ? l1.val : 0
    if (l2.val > 9) {
      // l2.val = 0 // 相加大于10的测试用例不过，只能用于等于10的
      l2.val = l2.val % 10
      if (l2.next) {
        l2.next.val++
      } else {
        l2.next = {
          val: 1,
          next: null
        }
      }
    }
    console.log(l2.val)
    l2 = l2.next
    l1 && (l1 = l1.next)
  }
  console.log(result)
  return result
};

// 上边用例[1,8]和[0]不通过，因为l2没走到>9的if，l2.next为null
var addTwoNumbers5 = function (l1, l2) {
  let result = l2
  while (l1 || l2) {
    if (l1 && !l2) {
      l2 = {
        val: 0,
        next: null
      }
    }
    l2.val += l1 ? l1.val : 0
    if (l2.val > 9) {
      l2.val = l2.val % 10
      if (l2.next) {
        l2.next.val++
      } else {
        l2.next = {
          val: 1,
          next: null
        }
      }
    }
    console.log(l2.val)
    l2 = l2.next
    l1 && (l1 = l1.next)
  }
  console.log(result, l1, l2)
  return result
};

// 上边result的长度，取决于l2的初始长度
/**
 * 
 * @param {*} l1 
 * @param {*} l2 
 * ### 解题思路
创新一个新链表，指向l2，while循环增加l1对应节点的val到l2，
如果和大于9，当前l2节点的val%10取余，l2的next的val+1，如果next为空则指向val为1的新节点。
如果l1比l2长，l2的next指向val为0的新节点（同时result也不会断掉）
 */
var addTwoNumbers = function (l1, l2) {
  let result = l2
  while (l1 || l2) {
    l2.val += l1 ? l1.val : 0
    if (l2.val > 9) {
      l2.val = l2.val % 10
      if (l2.next) {
        l2.next.val++
      } else {
        l2.next = {
          val: 1,
          next: null
        }
      }
    }
    console.log(l2.val)
    l1 && (l1 = l1.next)
    if (l1 && !l2.next) {
      // 不能断掉链表，只能将l2的next继续向下，否则result就跟l2的新next对象失去关联
      l2.next = {
        val: 0,
        next: null
      }
    }
    l2 = l2.next
  }
  console.log(result, l1, l2)
  return result
};


function Node(value) {
  // this.value = value;
  this.val = value
  this.next = null
}
var A = new Node(1) // 9
var B = new Node(8)
var C = new Node(3)
var D = new Node(9)
var E = new Node(9)

A.next = B
// B.next = C
// C.next = D
// D.next = E
// ===
function Node2(value) {
  // this.value = value;
  this.val = value
  this.next = null
}
var A2 = new Node2(0) // 9
var B2 = new Node2(6)
var C2 = new Node2(4)
var D2 = new Node2(9)

// A2.next = B2
// B2.next = C2
// C2.next = D2

addTwoNumbers(A, A2)

