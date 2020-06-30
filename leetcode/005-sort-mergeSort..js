/**
 * 88. 合并两个有序数组 【使用归并】
给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 
示例:
输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

来源：力扣（LeetCode）
链接：https://leetcode-cn.com/problems/merge-sorted-array
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const { log } = console
var merge = function(nums1, m, nums2, n) {
  const temp = []
  // 追加2，改长度
  for (let i = 0; i < n; i++) nums1[m + i] = nums2[i]
  nums1.length = m + n
  // 调用排序
  merge_sort(0, nums1.length - 1)
  // 排序
  function merge_sort(l, r) {
    if (l >= r) return

    let mid = (l + r) >> 1
    merge_sort(l, mid), merge_sort(mid + 1, r)

    let i = l,
      j = mid + 1,
      k = 0
    // 两个数组中的两个数需要交换的情况
    while (i <= mid && j <= r) {
      if (nums1[i] <= nums1[j]) temp[k++] = nums1[i++]
      else temp[k++] = nums1[j++]
    }

    // 两个数组，其中一个已经排完了，另一个遍历把剩下的全部排进去
    while (i <= mid) temp[k++] = nums1[i++]
    while (j <= r) temp[k++] = nums1[j++]

    for (let i = l, j = 0; i <= r; i++, j++) nums1[i] = temp[j]
  }
}
let nums1 = [4, 1, 3, 0, 0, 0],
  m = 3,
  nums2 = [2, 5, 6],
  n = 3
log(merge(nums1, m, nums2, n))
log(nums1)
