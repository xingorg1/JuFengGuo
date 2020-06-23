/*
 * @Author: guojufeng 
 * @Date: 2020-06-17 20:20:53 
 * @Last Modified by: guojufeng
 * @Last Modified time: 2020-06-23 12:52:30
 * 两数之和
  给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
  你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。

  给定 nums = [2, 7, 11, 15], target = 9
  因为 nums[0] + nums[1] = 2 + 7 = 9
  所以返回 [0, 1]

  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/two-sum
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

/**
 * 
 * @param {number[]} nums 数组
 * @param {number} target 结果数
 * 
 * 暴力求解,两次遍历 
    时间复杂度：O(n^2)
    空间复杂度：O(1)
 * 运行结果分析：
 * 执行用时: 80 ms
 * 执行用时 :132 ms, 在所有 JavaScript 提交中击败了47.35%的用户
 * 内存消耗 :35.7 MB, 在所有 JavaScript 提交中击败了13.56%的用户
 */
function towSum(nums, target) {
  let result = []
  if (Array.isArray(nums) && typeof target === 'number') {
    for (let i = 0; i < nums.length; i++) {
      for (let j = i + 1; j < nums.length; j++) {
        if (nums[i] + nums[j] === target) {
          result.push([
            [nums[i], nums[j]],
            [i, j]
          ])
        }
      }
    }
  }
  return result
}

let result = towSum([1, 2, 3, 14, 11, 13, 21, 4, 23], 24)
// console.log(result)
/* 结果：
[ [ [ 1, 23 ], [ 0, 8 ] ],
  [ [ 3, 21 ], [ 2, 6 ] ],
  [ [ 11, 13 ], [ 4, 5 ] ] ] */


/**
 * 祈求尽量减少时间复杂度
 * @param {*} nums 
 * @param {*} target 
 * 准备利用数组的some、和find让遍历少一点。
 * 失败
 */
// function towSum1(nums, target) {
//   let result = [],
//     flag = false
//   if (Array.isArray(nums) && typeof target === 'number') {
//     nums.some((i, num1) => {
//       nums.find((j, num2) => {
//         console.log(i, j)
//         if (i + j === target) {
//           flag = true
//           result.push([
//             [i, j],
//             [num1, num2]
//           ])
//         }
//       })
//       return flag
//     })
//   }
//   return result
// }

// let result1 = towSum1([1, 2, 3, 14, 11, 13, 21, 4, 23], 24)
// console.log(result1)

/**
 * 最佳求解
 * @param {*} nums 
 * @param {*} target 
 * 用一个对象，键为当前值和目标值的差，值为当前值的下标。
 * 对象结构伪代码：{ target - nums[i] : i }; 
 * 在仅有的一次循环中，如果对象的key等于当前遍历数组的值，说明当前数组的值就是之前遍历值与target的差。
 * 即以对象key对应的value值为下标，该下标所在数组中的对应值，和当前遍历的值之和是target。
 * 所以，对象key对应的value与当前遍历的i（数组下标）就是要找的那俩下标。
 */
function towSum2(nums, target) {
  if (!nums || !Array.isArray(nums)) return
  let len = nums.length, differMap = {}
  for (let i = 0; i < len; i++) {
    if (differMap[nums[i]] !== undefined) return [i, differMap[nums[i]]]
    differMap[target - nums[i]] = i
  }
}
let result2 = towSum2([1, 2, 3, 14, 11, 13, 21, 4, 23], 24)
console.log(result2)