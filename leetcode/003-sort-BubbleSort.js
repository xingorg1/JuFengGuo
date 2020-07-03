/**
 * 排序数组 912
 */
const nums = [5, 2, 3, 1, 1, 34, 46, 2]
//  冒泡

var BubbleSortArrayFirst = function(nums) {
  let len = nums.length
  for (var i = 0; i < len; i++) {
    // for (var j = 0; j < len - 1; j++) {
    for (var j = 0; j < len - i - 1; j++) {
      // 优化，排序到后边的不需要再遍历了。
      console.log(i, j)
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j + 1]
        nums[j + 1] = nums[j]
        nums[j] = temp
      }
    }
  }
  return nums
}

// console.log(BubbleSortArrayFirst([...nums]))

/**
 *
 * @param {Array} nums 待排序数组
 */
var BubbleSortArraySecond = function(nums) {
  if (!nums || !Array.isArray(nums)) return nums
  let len = nums.length,
    temp = null
  for (let i = 0; i < len - 1; i++) {
    console.log('i: ', i)
    for (let j = 0; j < len - 1 - i; j++) {
      console.log('--j:', j)
      if (nums[j] > nums[j + 1]) {
        temp = nums[j + 1]
        nums[j + 1] = nums[j]
        nums[j] = temp
      }
    }
  }
  return nums
}
console.log(BubbleSortArraySecond([...nums]))
console.log('======|======')
/**
 *
 * @param {Array} nums 待排序数组
 * 时间复杂度O(n)
 */
var BubbleSortArrayQuicker = function(nums) {
  if (!nums || !Array.isArray(nums)) return nums
  let i,
    j,
    flag,
    len = nums.length
  for (i = 0; i < len - 1; i++) {
    console.log('i: ', i)
    flag = 0
    for (j = 0; j < len - i - 1; j++) {
      console.log('--j:', j)
      if (nums[j] > nums[j + 1]) {
        temp = nums[j + 1]
        nums[j + 1] = nums[j]
        nums[j] = temp
        flag = 1
        // console.log(nums, flag)
      }
    }
    if (!flag) return nums
  }
  return nums
}
console.log('时间复杂度最优方式计算结果', BubbleSortArrayQuicker([...nums]))

// 封装冒泡排序如下：

/**
 * 两个数比较（这里比较大小）
 * @param {number} a 一个数
 * @param {number} b 另二个数
 * 返回比较结果
 */
function compare(a, b) {
  if (a > b) return true
  else return false
}
/**
 * 数组里的两个数进行交换(可以是任何交换算法，这里是最简单的第三方介入)
 * @param {Array} arr 待排序数组
 * @param {number} i 一个下标
 * @param {number} j 另一个下标
 * 返回交换后的数组
 */
function exchange(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * 排序（可以是任何排序方案，这里是冒泡）
 * @param {Array} arr 待排序数组
 * 返回排序后的数组
 */
function sort(arr) {
  if (!arr || !Array.isArray(arr)) return arr
  let len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (compare(arr[j], arr[j + 1])) exchange(arr, j, j + 1)
    }
  }
  return arr
}

// console.log(sort([...nums]))
