/**
 * 排序数组 912
 */
const nums = [5, 2, 3, 1, 1, 34, 46, 2]
//  冒泡

var BubbleSortArray = function (nums) {
  let len = nums.length
  for (var i = 0; i < len; i++) {
    // for (var j = 0; j < len - 1; j++) {
    for (var j = 0; j < len - i - 1; j++) { // 优化，排序到后边的不需要再遍历了。
      console.log(i, j)
      if (nums[j] > nums[j + 1]) {
        let temp = nums[j + 1]
        nums[j + 1] = nums[j]
        nums[j] = temp
      }
    }
  }
  return nums
};

console.log(BubbleSortArray([...nums]))
