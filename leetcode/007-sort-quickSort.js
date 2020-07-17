/*
 * @Author: guojufeng 
 * @Date: 2020-07-17 10:45:39 
 * @Last Modified by: guojufeng
 * @Last Modified time: 2020-07-17 10:54:39
 * 快速排序
 * 思路：取出标兵，然后小的放左边，大的放右边（从小到大排序的情况）
 */

var arr = [5, 2, 3, 1, 1, 34, 46, 2]
const { log } = console
function dealArr(arr) {
  // 验证
  quickSort0717(arr, 0, arr.length - 1)
  log(arr)
}
dealArr([...arr])

// 07.17
function quickSort0717(arr, l, r) {
  if(l >= r) return;
  var biaobing = arr[l + r >> 1],
    left_pointer = l - 1,
    right_pointer = r + 1; // +1
    while(left_pointer < right_pointer){
      do{
        left_pointer ++
      }
      while(arr[left_pointer] < biaobing);

      do{
        right_pointer --
      }
      while(arr[right_pointer] > biaobing);
      if (left_pointer < right_pointer) { // 左小于右
        [arr[left_pointer], arr[right_pointer]] = [arr[right_pointer], arr[left_pointer]];
      }
    }
    quickSort0717(arr, l, right_pointer);
    quickSort0717(arr, right_pointer + 1, r)
}