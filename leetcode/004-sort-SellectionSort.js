/*
 * @Author: @Guojufeng 
 * @Date: 2020-06-30 01:04:31 
 * @Last Modified by: @Guojufeng
 * @Last Modified time: 2020-06-30 23:32:19
 * 选择排序
 */

const nums = [5, 2, 3, 1, 1, 34, 46, 2]

/**
 * 
 * @param {number[]} nums 
 */
function SelectionSortFirst(nums) {
  if (!nums || !Array.isArray(nums)) return nums;
  let len = nums.length, max = 0, temp = null;
  for (let i = 0; i < len; i++) {
    let lastIndex = len - 1 - i;
    for (let j = 0; j < lastIndex; j++) {
      if (nums[max] < nums[j]) max = j;
    }
    temp = nums[lastIndex]
    nums[lastIndex] = nums[max]
    nums[max] = temp
  }
  return nums;
}
console.log(SelectionSortFirst([...nums]))

// 选择排序封装
/**
 * 比较功能
 * @param {number} a 待比较数字
 * @param {number} b 待比较数字
 */
function compare(a, b) {
  return a > b;
}

/**
 * 
 * @param {number[]} arr 待交换数组
 * @param {number} i 第一个下标
 * @param {number} j 第二个下标
 */
function exchange(arr, i, j) {
  let temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

/**
 * 排序功能
 * @param {number[]} arr 待排序数组
 */
function SelectionSortSecond(arr) {
  if (!arr || !Array.isArray(arr)) return false
  let len = arr.length,
    max = 0
  for (let i = 0; i < len; i++) {
    let lastIndex = len - 1 - i
    for (let j = 0; j < lastIndex; j++) {
      if (compare(arr[j], arr[max])) max = j
    }
    exchange(arr, max, lastIndex)
  }
  return arr
}

console.log(SelectionSortSecond([...nums]))
